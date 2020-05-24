import Trie from './TrieClass';

let trie = new Trie();
trie.insert('world');
trie.insert('hello');
trie.insert('hell');

trie.remove('hello');
trie.remove('hell');

trie.printAll();
