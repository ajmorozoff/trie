import Trie from './Trie';

let trie = new Trie();
trie.insert('world');
trie.insert('hello');
trie.insert('hell');

trie.remove('hello');
trie.remove('hell');

trie.printAll();
//console.log(JSON.stringify(trie, null, 4));
