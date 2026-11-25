// Seed content: Spanish -> English, everyday vocabulary + grammar + pronunciation.
// Each lesson introduces exactly ONE new word, ONE grammar point, and mixed exercises.
// Exercise types:
//   choice: { type:'choice', prompt, options:string[], answer:string }
//   order:  { type:'order',  prompt, words:string[],   answer:string[] }  (answer words are in `words`)
//   listen: { type:'listen', prompt, answer:string }   (type the English you hear)
//   speak:  { type:'speak',  prompt, answer:string }    (say the English out loud)

export const UNITS = [
  {
    id: 'u1',
    title: 'Unit 1 · Saludos',
    lessons: [
      {
        id: 'u1l1',
        title: 'Hello!',
        newWord: { es: 'hola', en: 'hello' },
        grammar: { title: 'To be (am/is/are)', body: 'I am · You are · He/She is. Ej: I am here.' },
        exercises: [
          { type: 'choice', prompt: '¿Cómo se dice "hola"?', options: ['hello', 'bye', 'thanks'], answer: 'hello' },
          { type: 'listen', prompt: 'Escribí lo que escuchás', answer: 'hello' },
          { type: 'speak', prompt: 'Decí "hello"', answer: 'hello' },
        ],
      },
      {
        id: 'u1l2',
        title: 'Thank you',
        newWord: { es: 'gracias', en: 'thank you' },
        grammar: { title: 'Politeness', body: 'Say "please" and "thank you" a lot. Ej: Thank you!' },
        exercises: [
          { type: 'choice', prompt: '¿Cómo se dice "gracias"?', options: ['please', 'thank you', 'sorry'], answer: 'thank you' },
          { type: 'order', prompt: 'Ordená: "Thank you very much"', words: ['much', 'Thank', 'you', 'very'], answer: ['Thank', 'you', 'very', 'much'] },
          { type: 'speak', prompt: 'Decí "thank you very much"', answer: 'thank you very much' },
        ],
      },
      {
        id: 'u1l3',
        title: 'Goodbye',
        newWord: { es: 'adiós', en: 'goodbye' },
        grammar: { title: 'Greetings', body: 'Hello to start, goodbye to end. Ej: Goodbye, see you!' },
        exercises: [
          { type: 'choice', prompt: '¿Cómo se dice "adiós"?', options: ['hello', 'goodbye', 'morning'], answer: 'goodbye' },
          { type: 'listen', prompt: 'Escribí lo que escuchás', answer: 'goodbye' },
          { type: 'speak', prompt: 'Decí "goodbye"', answer: 'goodbye' },
        ],
      },
    ],
  },
  {
    id: 'u2',
    title: 'Unit 2 · Comida',
    lessons: [
      {
        id: 'u2l1',
        title: 'Water',
        newWord: { es: 'agua', en: 'water' },
        grammar: { title: 'Articles a/an', body: 'Use "a" before a consonant, "an" before a vowel. Ej: a glass of water.' },
        exercises: [
          { type: 'choice', prompt: '¿Cómo se dice "agua"?', options: ['milk', 'water', 'bread'], answer: 'water' },
          { type: 'order', prompt: 'Ordená: "a glass of water"', words: ['of', 'a', 'water', 'glass'], answer: ['a', 'glass', 'of', 'water'] },
          { type: 'speak', prompt: 'Decí "a glass of water"', answer: 'a glass of water' },
        ],
      },
      {
        id: 'u2l2',
        title: 'Bread',
        newWord: { es: 'pan', en: 'bread' },
        grammar: { title: 'I want / I would like', body: 'To order politely: "I would like some bread."' },
        exercises: [
          { type: 'choice', prompt: '¿Cómo se dice "pan"?', options: ['rice', 'bread', 'cheese'], answer: 'bread' },
          { type: 'listen', prompt: 'Escribí lo que escuchás', answer: 'bread' },
          { type: 'speak', prompt: 'Decí "I would like some bread"', answer: 'I would like some bread' },
        ],
      },
      {
        id: 'u2l3',
        title: 'Coffee',
        newWord: { es: 'café', en: 'coffee' },
        grammar: { title: 'Countable vs uncountable', body: 'Coffee is uncountable: "some coffee", not "a coffee" (usually).' },
        exercises: [
          { type: 'choice', prompt: '¿Cómo se dice "café"?', options: ['tea', 'coffee', 'juice'], answer: 'coffee' },
          { type: 'order', prompt: 'Ordená: "I would like some coffee"', words: ['coffee', 'I', 'some', 'would', 'like'], answer: ['I', 'would', 'like', 'some', 'coffee'] },
          { type: 'speak', prompt: 'Decí "I would like some coffee"', answer: 'I would like some coffee' },
        ],
      },
    ],
  },
  {
    id: 'u3',
    title: 'Unit 3 · Casa',
    lessons: [
      {
        id: 'u3l1',
        title: 'House',
        newWord: { es: 'casa', en: 'house' },
        grammar: { title: 'There is / There are', body: 'There is a house. There are two rooms.' },
        exercises: [
          { type: 'choice', prompt: '¿Cómo se dice "casa"?', options: ['house', 'car', 'table'], answer: 'house' },
          { type: 'listen', prompt: 'Escribí lo que escuchás', answer: 'house' },
          { type: 'speak', prompt: 'Decí "there is a house"', answer: 'there is a house' },
        ],
      },
      {
        id: 'u3l2',
        title: 'Table',
        newWord: { es: 'mesa', en: 'table' },
        grammar: { title: 'Prepositions of place', body: 'on / under / next to. Ej: The book is on the table.' },
        exercises: [
          { type: 'choice', prompt: '¿Cómo se dice "mesa"?', options: ['chair', 'table', 'door'], answer: 'table' },
          { type: 'order', prompt: 'Ordená: "the book is on the table"', words: ['table', 'the', 'is', 'book', 'on', 'the'], answer: ['the', 'book', 'is', 'on', 'the', 'table'] },
          { type: 'speak', prompt: 'Decí "the book is on the table"', answer: 'the book is on the table' },
        ],
      },
      {
        id: 'u3l3',
        title: 'Door',
        newWord: { es: 'puerta', en: 'door' },
        grammar: { title: 'Open / close', body: 'Open the door. Close the door. Imperatives use the base verb.' },
        exercises: [
          { type: 'choice', prompt: '¿Cómo se dice "puerta"?', options: ['window', 'door', 'wall'], answer: 'door' },
          { type: 'listen', prompt: 'Escribí lo que escuchás', answer: 'door' },
          { type: 'speak', prompt: 'Decí "open the door"', answer: 'open the door' },
        ],
      },
    ],
  },
  {
    id: 'u4',
    title: 'Unit 4 · Acciones',
    lessons: [
      {
        id: 'u4l1',
        title: 'Eat',
        newWord: { es: 'comer', en: 'to eat' },
        grammar: { title: 'Present simple', body: 'I eat · You eat · He eats. Add -s for he/she/it.' },
        exercises: [
          { type: 'choice', prompt: '¿Cómo se dice "comer"?', options: ['to eat', 'to drink', 'to sleep'], answer: 'to eat' },
          { type: 'order', prompt: 'Ordená: "I eat bread"', words: ['eat', 'I', 'bread'], answer: ['I', 'eat', 'bread'] },
          { type: 'speak', prompt: 'Decí "I eat bread"', answer: 'I eat bread' },
        ],
      },
      {
        id: 'u4l2',
        title: 'Drink',
        newWord: { es: 'beber', en: 'to drink' },
        grammar: { title: 'Negatives: don\'t', body: 'I do not (don\'t) drink coffee. He does not (doesn\'t).' },
        exercises: [
          { type: 'choice', prompt: '¿Cómo se dice "beber"?', options: ['to eat', 'to drink', 'to run'], answer: 'to drink' },
          { type: 'listen', prompt: 'Escribí lo que escuchás', answer: 'to drink' },
          { type: 'speak', prompt: 'Decí "I drink water"', answer: 'I drink water' },
        ],
      },
      {
        id: 'u4l3',
        title: 'Go',
        newWord: { es: 'ir', en: 'to go' },
        grammar: { title: 'Questions: do/does', body: 'Do you go? Does he go? Use do/does to ask.' },
        exercises: [
          { type: 'choice', prompt: '¿Cómo se dice "ir"?', options: ['to go', 'to come', 'to stop'], answer: 'to go' },
          { type: 'order', prompt: 'Ordená: "I go to school"', words: ['school', 'go', 'I', 'to'], answer: ['I', 'go', 'to', 'school'] },
          { type: 'speak', prompt: 'Decí "I go to school"', answer: 'I go to school' },
        ],
      },
    ],
  },
  {
    id: 'u5',
    title: 'Unit 5 · Ciudad',
    lessons: [
      {
        id: 'u5l1',
        title: 'Street',
        newWord: { es: 'calle', en: 'street' },
        grammar: { title: 'Directions', body: 'go straight, turn left, turn right.' },
        exercises: [
          { type: 'choice', prompt: '¿Cómo se dice "calle"?', options: ['street', 'square', 'park'], answer: 'street' },
          { type: 'listen', prompt: 'Escribí lo que escuchás', answer: 'street' },
          { type: 'speak', prompt: 'Decí "go straight"', answer: 'go straight' },
        ],
      },
      {
        id: 'u5l2',
        title: 'Left',
        newWord: { es: 'izquierda', en: 'left' },
        grammar: { title: 'Turn left / right', body: 'Turn left. Turn right. "Left" is the opposite of "right".' },
        exercises: [
          { type: 'choice', prompt: '¿Cómo se dice "izquierda"?', options: ['right', 'left', 'up'], answer: 'left' },
          { type: 'order', prompt: 'Ordená: "turn left"', words: ['left', 'turn'], answer: ['turn', 'left'] },
          { type: 'speak', prompt: 'Decí "turn left"', answer: 'turn left' },
        ],
      },
      {
        id: 'u5l3',
        title: 'Park',
        newWord: { es: 'parque', en: 'park' },
        grammar: { title: 'Near / far', body: 'The park is near. The station is far.' },
        exercises: [
          { type: 'choice', prompt: '¿Cómo se dice "parque"?', options: ['park', 'shop', 'bank'], answer: 'park' },
          { type: 'listen', prompt: 'Escribí lo que escuchás', answer: 'park' },
          { type: 'speak', prompt: 'Decí "the park is near"', answer: 'the park is near' },
        ],
      },
    ],
  },
];