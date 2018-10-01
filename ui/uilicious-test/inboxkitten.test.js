//
// This is a https://uilicious.com/ test case
//
// See : https://test.uilicious.com/test/public/DRupiHvXGspN9wVUYNv3Re
// for an example of using this test script
//
// Alternatively signup to schedule a background task, or use their CLI =)
// #selfpromotion
//

//
// Testing for empty inbox
//

// Lets goto tuamaeaquelaursa
I.goTo("https://tuamaeaquelaursa.com");
I.see("Crie um email descartável @tuamaeaquelaursa.com");

// Go to a random inbox inbox
I.fill("email", SAMPLE.id(22));
I.click("Criar email");

// Check that its empty
I.see("Tua mãe, aquela ursa, ainda não recebeu nenhum email =/");

//
// Testing for regular email
// (sent using a jenkins perodic build)
//

// Lets go back tuamaeaquelaursa mailbox
I.goTo("https://tuamaeaquelaursa.com");
I.see("Crie um email descartável @tuamaeaquelaursa.com");
I.fill("email", "ik-reciever-f7s1g28");
I.click("Criar email");

// See an email we expect, and click it
I.click("Testing inboxkitten subject");

// And validate the content
I.see("Testing inboxkitten text content");
