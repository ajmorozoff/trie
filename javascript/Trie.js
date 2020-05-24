/* eslint-disable complexity */
const chalk = require('chalk');

class Trie {
  constructor() {
    this.children = {};
    this.terminates = false;
  }

  insert(word) {
    let currentNode = this;
    for (let i = 0; i < word.length; i++) {
      let character = word[i];
      if (!currentNode.children[character]) {
        currentNode.children[character] = new Trie();
      }
      currentNode = currentNode.children[character];
    }
    currentNode.terminates = true;
    return word;
  }

  containsWord(word) {
    let currentNode = this;
    for (let i = 0; i < word.length; i++) {
      let character = word[i];
      if (!currentNode.children[character]) {
        return false;
      }
    }
    return currentNode.terminates;
  }

  printAll() {
    let wordList = [];

    //this recursive helper function does a DFS through each branch
    const dfsRecurse = (node, path) => {
      if (!node) {
        return;
      }
      if (node.terminates) {
        wordList.push(path);
        console.log(chalk.magenta(path));
      }
      Object.keys(node.children).forEach((child) => {
        dfsRecurse(node.children[child], path + child);
      });
    };
    dfsRecurse(this, '');
  }

  remove(word) {
    let currentNode = this;
    let stack = [];
    for (let i = 0; i < word.length; i++) {
      let character = word[i];
      if (!currentNode.children[character]) {
        return false; //word isn't in tree; return false
      }
      stack.push(currentNode);
      currentNode = currentNode.children[character];
    }

    currentNode.terminates = false;

    //if there are other children (and thus words) stemming from this node, return
    if (Object.keys(currentNode.children).length) {
      return true;
    }

    //else, retrieve the parent
    while (stack.length) {
      let parent = stack.pop();

      //if the parent has only one child, it's this one, so we can remove the children
      if (Object.keys(parent.children).length === 1) {
        parent.children = {};
        //if the parent represents the end of the word, don't trim upwards anymore
        if (parent.terminates) {
          return;
        }
      }
      //if there are multiple children for the parent, we search for this one and remove it
      for (let child in parent.children) {
        if (child === currentNode) {
          parent.children[child] = {};
        }
      }
      currentNode = parent;
    }
    return true;
  }
}

module.exports = Trie;
