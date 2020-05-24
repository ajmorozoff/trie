/* eslint-disable complexity */
const chalk = require('chalk');

class Trie {
  children: { [key: string]: Trie };
  isWord: boolean;

  constructor() {
    this.children = {};
    this.isWord = false;
  }

  insert(word: string) {
    let currentNode: Trie = this;

    //traverse down the tree, adding each letter as a child if needed
    for (let i = 0; i < word.length; i++) {
      let character = word[i];
      if (!currentNode.children[character]) {
        currentNode.children[character] = new Trie();
      }
      currentNode = currentNode.children[character];
    }

    currentNode.isWord = true; //mark the end!

    return word; //or whatever, I don't care what you return
  }

  containsWord(word: string) {
    let currentNode = this;
    for (let i = 0; i < word.length; i++) {
      let character = word[i];
      if (!currentNode.children[character]) {
        return false;
      }
    }
    return currentNode.isWord;
  }

  printAll() {
    let wordList = [];

    //this recursive helper function does a DFS through each branch
    const dfsRecurse = (node: Trie, path: string) => {
      if (!node) {
        return;
      }
      if (node.isWord) {
        wordList.push(path);
        console.log(chalk.magenta(path));
      }
      Object.keys(node.children).forEach((child) => {
        dfsRecurse(node.children[child], path + child);
      });
    };
    dfsRecurse(this, '');
  }

  remove(word: string) {
    let currentNode: Trie = this;
    let stack: Trie[] = [];
    for (let i = 0; i < word.length; i++) {
      let character = word[i];
      if (!currentNode.children[character]) {
        return false; //word isn't in tree; return false
      }
      stack.push(currentNode);
      currentNode = currentNode.children[character];
    }

    currentNode.isWord = false;

    //if there are other children (and thus words) stemming from this node, return
    if (Object.keys(currentNode.children).length) {
      return true;
    }

    //else, retrieve the parent
    while (stack.length) {
      let parent: Trie | undefined = stack.pop();

      if (!parent) {
        return;
      }

      //if the parent has only one child, it's this one, so we can remove the children
      if (Object.keys(parent.children).length === 1) {
        parent.children = {};
        //if the parent represents the end of the word, don't trim upwards anymore
        if (parent.isWord) {
          return;
        }
      }
      //if there are multiple children for the parent, we search for this one and remove it
      for (let child in parent.children) {
        if (parent.children[child] === currentNode) {
          //if this is the only child, reset children for the character to {}
          parent.children[child] = new Trie();
        }
      }
      currentNode = parent;
    }
    return true;
  }
}

export default Trie;
