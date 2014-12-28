source("makeMapJSON.R")

g = erdos.renyi.game(25, 1/15)
makeMapJSON(gr=g, names=letters[1:25], tags=LETTERS[1:25], sizes=(1:25)*10,
            file="output.json")
