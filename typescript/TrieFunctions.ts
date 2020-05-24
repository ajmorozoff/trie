interface Trie {
  children: { [key: string]: Trie };
  isWord: boolean;
}

function insert(trie: Trie, word: string) {
  let currentNode: Trie = trie;

  for (let i = 0; i < word.length; i++) {
    let character = word[i];
    if (!currentNode.children[character]) {
      currentNode.children[character] = { isWord: false, children: {} };
    }
    currentNode = currentNode.children[character];
  }

  currentNode.isWord = true;

  return word;
}

function containsWord(trie: Trie, word: string) {
  let currentNode: Trie = trie;
  for (let i = 0; i < word.length; i++) {
    let character = word[i];
    if (!currentNode.children[character]) {
      return false;
    }
  }
  return currentNode.isWord;
}

function remove(trie: Trie, word: string) {
  let currentNode: Trie = trie;
  let stack: Trie[] = [];
  for (let i = 0; i < word.length; i++) {
    let character = word[i];
    if (!currentNode.children[character]) {
      return false;
    }
    stack.push(currentNode);
    currentNode = currentNode.children[character];
  }

  currentNode.isWord = false;

  if (Object.keys(currentNode.children).length) {
    return true;
  }

  while (stack.length) {
    let parent: Trie | undefined = stack.pop();

    if (!parent) {
      return;
    }

    if (Object.keys(parent.children).length === 1) {
      parent.children = {};
      if (parent.isWord) {
        return;
      }
    }
    for (let child in parent.children) {
      if (parent.children[child] === currentNode) {
        parent.children[child] = { isWord: false, children: {} };
      }
    }
    currentNode = parent;
  }
  return true;
}
