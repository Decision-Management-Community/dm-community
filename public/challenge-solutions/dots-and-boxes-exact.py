#!/usr/bin/env python3
"""Exact, dependency-free Dots and Boxes policy for a 2x2-box board.

The classical 'complete a box, play again' rule is used. Run:
  python dots_and_boxes_exact.py --verify
  python dots_and_boxes_exact.py --play
  python dots_and_boxes_exact.py --benchmark
"""
from __future__ import annotations

import argparse
from functools import lru_cache
import random
from dataclasses import dataclass


@dataclass(frozen=True)
class Board:
    rows: int
    cols: int
    edges: tuple[tuple[tuple[int, int], tuple[int, int]], ...]
    box_masks: tuple[int, ...]

    @property
    def full(self) -> int:
        return (1 << len(self.edges)) - 1


def make_board(rows: int = 2, cols: int = 2) -> Board:
    edges = []
    for r in range(rows + 1):
        for c in range(cols):
            edges.append(((r, c), (r, c + 1)))
    for r in range(rows):
        for c in range(cols + 1):
            edges.append(((r, c), (r + 1, c)))
    index = {frozenset(endpoints): i for i, endpoints in enumerate(edges)}
    masks = []
    for r in range(rows):
        for c in range(cols):
            vertices = ((r, c), (r, c + 1), (r + 1, c), (r + 1, c + 1))
            pairs = ((vertices[0], vertices[1]), (vertices[2], vertices[3]),
                     (vertices[0], vertices[2]), (vertices[1], vertices[3]))
            masks.append(sum(1 << index[frozenset(pair)] for pair in pairs))
    return Board(rows, cols, tuple(edges), tuple(masks))


def captures(board: Board, mask: int, edge: int) -> int:
    bit = 1 << edge
    if mask & bit:
        raise ValueError(f"Edge {edge} is already drawn")
    after = mask | bit
    return sum((after & bm) == bm and (mask & bm) != bm for bm in board.box_masks)


def exact_policy(board: Board):
    """Return value and action functions, with value measured for player to move.

    A capture grants an extra move (so no sign change); otherwise the
    opponent moves next (so change sign). Memoization merges all histories
    sharing the same drawn-edge mask.
    """
    @lru_cache(None)
    def value(mask: int) -> int:
        if mask == board.full:
            return 0
        best = -(len(board.box_masks) + 1)
        for e in range(len(board.edges)):
            if mask & (1 << e):
                continue
            pts = captures(board, mask, e)
            nxt = value(mask | (1 << e))
            candidate = pts + nxt if pts else -nxt
            best = max(best, candidate)
        return best

    def action(mask: int) -> int:
        if mask == board.full:
            raise ValueError("Game already complete")
        target = value(mask)
        for e in range(len(board.edges)):
            if mask & (1 << e):
                continue
            pts = captures(board, mask, e)
            nxt = value(mask | (1 << e))
            if (pts + nxt if pts else -nxt) == target:
                return e
        raise AssertionError("No optimal action")

    return value, action


def greedy_move(board: Board, mask: int) -> int:
    """Claim a box when available; otherwise avoid creating 3-sided boxes."""
    candidates = [i for i in range(len(board.edges)) if not mask & (1 << i)]
    def rank(e):
        pts = captures(board, mask, e)
        new = mask | (1 << e)
        gifted = sum((new & bm).bit_count() == 3 for bm in board.box_masks)
        return (-pts, gifted, e)
    return min(candidates, key=rank)


def play(board: Board, first, second, trace: bool = False) -> tuple[int, int, list[tuple[int, int, int]]]:
    strategies = (first, second)
    points = [0, 0]
    mask = 0
    turn = 0
    history = []
    while mask != board.full:
        edge = strategies[turn](mask)
        if not (0 <= edge < len(board.edges)) or mask & (1 << edge):
            raise AssertionError(f"Illegal move {edge}")
        won = captures(board, mask, edge)
        mask |= 1 << edge
        points[turn] += won
        history.append((turn, edge, won))
        if not won:
            turn = 1 - turn
    assert sum(points) == len(board.box_masks)
    assert len(history) == len(board.edges)
    return points[0], points[1], history if trace else []


def draw(board: Board, mask: int):
    idx = {frozenset(p): i for i, p in enumerate(board.edges)}
    def present(a, b):
        return bool(mask & (1 << idx[frozenset((a, b))]))
    for r in range(board.rows + 1):
        print("".join("o" + ("---" if present((r,c),(r,c+1)) else "   ") for c in range(board.cols)) + "o")
        if r < board.rows:
            print("".join(("|" if present((r,c),(r+1,c)) else " ") + "   " for c in range(board.cols))
                  + ("|" if present((r,board.cols),(r+1,board.cols)) else " "))


def human_game():
    board = make_board()
    value, best = exact_policy(board)
    mask, turn = 0, 0
    scores = [0, 0]
    print("Dots and Boxes: 2x2 boxes, you play first (player 0).")
    print("Classical rule: completing a box grants another turn.")
    print("Edge numbering, with endpoints (row,column):")
    for i, endpoints in enumerate(board.edges):
        print(f"  {i:>2}: {endpoints[0]} -- {endpoints[1]}")
    while mask != board.full:
        draw(board, mask)
        print(f"Score: human {scores[0]}, exact policy {scores[1]}; remaining {value(mask)} for player to move")
        if turn == 0:
            try:
                edge = int(input("Your undrawn edge number: "))
            except ValueError:
                print("Enter an integer edge number.")
                continue
            if not (0 <= edge < len(board.edges)) or mask & (1 << edge):
                print("Illegal edge; please try again.")
                continue
        else:
            edge = best(mask)
            print(f"Computer draws edge {edge}")
        gained = captures(board, mask, edge)
        mask |= 1 << edge
        scores[turn] += gained
        if gained:
            print(f"Player {turn} claims {gained} box(es) and plays again")
        else:
            turn = 1 - turn
    draw(board, mask)
    print(f"Final score: human {scores[0]}, computer {scores[1]}")


def verify():
    """Independently verify the DP with bottom-up dynamic programming."""
    for rows, cols in ((1,1),(1,2),(2,2)):
        board = make_board(rows, cols)
        value, best = exact_policy(board)
        table = [0] * (board.full + 1)
        for mask in range(board.full - 1, -1, -1):
            candidates = []
            for e in range(len(board.edges)):
                if mask & (1 << e):
                    continue
                bit = 1 << e
                gained = captures(board, mask, e)
                candidates.append(gained + table[mask | bit] if gained else -table[mask | bit])
            table[mask] = max(candidates)
            assert table[mask] == value(mask), (rows, cols, mask)
            chosen = best(mask)
            gained = captures(board, mask, chosen)
            assert (gained + table[mask | (1 << chosen)] if gained else -table[mask | (1 << chosen)]) == table[mask]
        assert value(board.full) == 0
        for mask in range(board.full + 1):
            complete = sum((mask & bm) == bm for bm in board.box_masks)
            if mask != board.full:
                for e in range(len(board.edges)):
                    if not mask & (1 << e):
                        new = mask | (1 << e)
                        assert captures(board, mask, e) == sum((new & bm) == bm for bm in board.box_masks) - complete
        scores = play(board, best, best)
        assert scores[0] - scores[1] == table[0], (scores, table[0])
        print(f"Verified {rows}x{cols}: {len(board.edges)} edges, {board.full + 1} masks; first-player optimal margin {table[0]:+d}; optimal-play score {scores[:2]}")
    print("PASS: Bellman consistency, independent bottom-up recurrence, legal actions, captures, and full-game scoring")


def benchmark(n: int = 1000, seed: int = 20261121):
    board = make_board()
    value, optimal = exact_policy(board)
    assert value(0) == play(board, optimal, optimal)[0] - play(board, optimal, optimal)[1]
    rng = random.Random(seed)
    def random_policy(mask):
        return rng.choice([e for e in range(len(board.edges)) if not mask & (1 << e)])
    for name, opponent in (("greedy", lambda m: greedy_move(board, m)), ("random", random_policy)):
        for seat in ("first", "second"):
            victories = ties = defeats = 0
            points = 0
            for _ in range(n):
                first, second = (optimal, opponent) if seat == "first" else (opponent, optimal)
                a,b,_ = play(board, first, second)
                ours, theirs = (a,b) if seat == "first" else (b,a)
                points += ours
                victories += ours > theirs
                ties += ours == theirs
                defeats += ours < theirs
            print(f"Exact as {seat} vs {name}: {victories}W/{ties}T/{defeats}L in {n} games; avg boxes {points/n:.3f}/4")


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    mode = parser.add_mutually_exclusive_group(required=True)
    mode.add_argument("--verify", action="store_true")
    mode.add_argument("--play", action="store_true")
    mode.add_argument("--benchmark", action="store_true")
    args = parser.parse_args()
    if args.verify:
        verify()
    elif args.play:
        human_game()
    else:
        benchmark()


if __name__ == "__main__":
    main()