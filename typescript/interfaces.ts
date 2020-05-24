interface Trie {
  children: { [key: string]: Trie };
  isWord: boolean;
}

interface Trie {
  value: string;
  children: { [key: string]: Trie };
  isWord: boolean;
}
