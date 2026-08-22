/**
 * Historical email links copied from the legacy Challenge pages.  Keep this
 * separate from contributor profiles: these addresses identify the person who
 * submitted a particular solution, not necessarily a current contact method.
 */
const emails: Record<string, string> = {
  'Adrian Walker': 'adriandwalker@gmail.com',
  'Alex Fleischer': 'afleischer@fr.ibm.com',
  'Alex Goldin': 'alexgoldin@openrules.com',
  'Alex Mirtsyn': 'alexmirtsyn@openrules.com',
  'Alex Porcelli': 'porcelli@aletyx.ai',
  'Alireza Soroudi': 'alireza.soroudi@gmail.com',
  'Andrew Macdonald': 'macdonald@uk.ibm.com',
  'Antonio Plais': 'antonioplais@centus.com.br',
  'Arash Aghlara': 'arash.aghlara@pliantframework.com',
  'Arun Pareek': 'arun.pareek@rubiconred.com',
  'Baljeet Singh': 'bsingh@rulesmatix.com',
  'Baljeet Singh Kandhari': 'bsingh@rulesmatix.com',
  'Bernhard C. Schrenk': 'clemy@clemy.org',
  'Bob Moore': 'drrbmoore@yahoo.co.uk',
  'Boro Vujosevic': 'borovujosevic@yahoo.com',
  'Bruce Silver': 'bruce@brsilver.com',
  'Carole-Ann Berlioz': 'cberlioz@sparklinglogic.com',
  'Carole-Ann Matignon': 'cmatignon@sparklinglogic.com',
  'Chad Musick': 'chad.e.musick@gmail.com',
  'Damir Sudarevic': 'damir.sudarevic@gmail.com',
  'David Durant': 'david.durant@tiscali.co.uk',
  'Denis Gagné': 'dgagne@trisotech.com',
  'Dr. Bob Moore': 'drrbmoore@yahoo.co.uk',
  'Dr. Vijay Bandekar': 'vijay.bandekar@gmail.com',
  'Edson Tirelli': 'ed.tirelli@gmail.com',
  'Emmanuel Bonnet': 'emmanuel.bonnet@softeam.fr',
  'Emmanuel Lazard': 'Emmanuel.Lazard@dauphine.psl.eu',
  'Eric Manalac': 'emanalac1996@gmail.com',
  'Evan Semet': 'evancsemet@gmail.com',
  'Falko Menge': 'falko.menge@camunda.com',
  'Faisal Ahmed': 'ahmed.960@buckeyemail.osu.edu',
  'Filipe Brandão': 'fdabrandao@gmail.com',
  'Florian Sikora': 'florian.sikora@dauphine.fr',
  'Francisco Manso': 'fmanso@decidesoluciones.es',
  'Gary Hallmark': 'gary.hallmark@oracle.com',
  'Gene Weng': 'gene.weng@gmail.com',
  'Gil Ronen': 'Gil.Ronen@sapiens.com',
  'Gil Segal': 'gil.segal@sapiens.com',
  'Gopal Gupta': 'gupta@utdallas.edu',
  'Guillaume Chagneau': 'guillaume.chagneau@m6.fr',
  'Hakan Kjellerstrand': 'hakank@gmail.com',
  'I. Khlystov': 'khlystov@gmail.com',
  'Ian Detinich': 'iandetinich@gmail.com',
  'J Jansonius': 'jackjansonius@gmail.com',
  'Jack Jansonius': 'jackjansonius@gmail.com',
  'Jacob Feldman': 'jacobfeldman@openrules.com',
  'James Delonay': 'jamesdelonay@gmail.com',
  'James Taylor': 'james@decisionmanagementsolutions.com',
  'Jan Purchase': 'purchase@luxmagi.com',
  'Jan Vanthienen': 'jan.vanthienen@kuleuven.be',
  'Joachim Schimpf': 'jschimpf@coninfer.com',
  'Jordy Voesten': 'jordy.voesten@avola-decision.com',
  'Julien Pradier': 'pradier.j@fr.ibm.com',
  'Kurth Wilfried': 'wilfried.kurth@axa.ch',
  'Ken Ritley': 'kenneth.ritley@bfh.ch',
  'Leonid Nisenboym': 'nisenl@hotmail.com',
  'Maarten Schadd': 'm.schadd@blueriq.com',
  'Mahesh Shankar': 'maheshshankar96@gmail.com',
  'Martijn Tromm': 'Martijn.Tromm@rabobank.nl',
  'Martin de Villiers': 'devilliers.martin@gmail.com',
  'Matteo Redaelli': 'matteo.redaelli@gmail.com',
  'Matthias Tylkowski': 'matthias@binarypark.org',
  'Michael Parish': 'mparish@progress.com',
  'Mike Parish': 'mparish@progress.com',
  'Mélanie Gauthier': 'mgauthier@trisotech.com',
  'Nick Broom': 'nick@bluepowderconsultancy.co.uk',
  'Philippe Laborie': 'laborie@fr.ibm.com',
  'Pradeep Venkat': 'PVenkat15@gmail.com',
  'Prof. Jan Vanthienen': 'jan.vanthienen@kuleuven.be',
  'Rafael Ortiguela': 'rortiguela@decidesoluciones.es',
  'Riccardo Hertel': 'rh@riccardo-hertel.com',
  'Rob Parker': 'rob.parker.private@gmail.com',
  'Robert Fourer': '4er@ampl.com',
  'Robert Parker': 'Robert.Parker@auspost.com.au',
  'Ronald G. Ross': 'rross@brsolutions.com',
  'Sadie Geen': 'sadie.geen@ngahr.com',
  'Seth Meldon': 'Seth.Meldon@progress.com',
  'Simon Vandevelde': 's.vandevelde@kuleuven.be',
  'SolverMax': 'contact@solvermax.com',
  'Thierry Guerin': 't.guerin@groupeonepoint.com',
  'Vedavyas Etikala': 'vedavyas.etikala@kuleuven.be',
  'Vlad Silverman': 'vsilverman@gmail.com',
  'Yuliya Bastun': 'openltablets@exigeninsurance.com',
};

export function challengeAuthorEmail(author: string): string | undefined {
  return emails[author.trim()];
}

// The legacy page sometimes linked a submitter name to a public profile rather
// than an email address. Retain those links too, so a migrated solution does
// not lose its original attribution link.
const profiles: Record<string, string> = {
  'Jeremiah Connelly': 'https://jeremiahconnelly.dev/#',
  'Dr. John Svirbely': 'https://www.trisotech.com/john-svirbely/',
};

export function challengeAuthorProfileUrl(author: string): string | undefined {
  return profiles[author.trim()];
}
