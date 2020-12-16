from logging import log
from function import *
from db import *


class Block():
    """ this is the block, datastructure contain containing all the information about a node """

    data = None
    hash = None
    nonce = 0
    previous_hash = "0"*64

    def __init__(self, data, number=0):
        """ Constructor """

        self.data = data
        self.number = number

    def hash(self):
        """ Function that produces the hash of the object  """

        return updateHash(self.previous_hash, self.hash, self.data, self.nonce)

    def __str__(self):
        """ converting the information into a string """

        return str("Block %s\nHash %s\nPrevious %s\nData %s\nNonce %s\n"
                   % (self.number, self.hash(), self.previous_hash, self.data, self.nonce))


class Blockchain():
    difficulty = 3

    def __init__(self, chain=[]):
        self.chain = chain

    def mine(self, block: Block, last_rec):
        last_rec = get_last_row()
        try:
            if last_rec[0] == 1:
                block.previous_hash = "0"*64
            else:
                temp = second_last_row()
                block.previous_hash = temp[3]
        except IndexError:
            log("Cannot get the hash of last block")

        while True:
            if block.hash()[:self.difficulty] == "0" * self.difficulty:
                add_node_todb(block, last_rec)
                break
            else:
                block.nonce += 1

    def isValid(self):
        """ to verify the validity of blockchain """
        for i in range(1, len(self.chain)):
            _previous = self.chain[i].previous_hash
            _current = self.chain[i-1].hash()
            if _previous != _current or _current[:self.difficulty] != "0"*self.difficulty:
                return False
        return True
