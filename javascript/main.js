const Trie = require('./Trie');

let trie = new Trie();
trie.insert('world');
trie.insert('hello');
trie.insert('hell');

trie.remove('hello');

trie.printAll();
