source("makeMapJSON.R")

g = erdos.renyi.game(25, 1/15)
makeMapJSON(gr=g, names=letters[1:25], tags=LETTERS[1:25], sizes=(1:25)*10,
            file="output.json")


edge=read.csv ("data/CFNetwork.csv", as.is=TRUE)
group=read.csv("data/CFNetworkGroups.csv", as.is=TRUE)
groupcode=read.csv("data/CFNetworkGroupCode.csv", as.is=TRUE)

elist = cbind(match(edge$Name1, group$Name),match(edge$Name2, group$Name)) - 1L
elist = elist[apply(is.na(elist),1,sum) == 0,]

groupNames = groupcode$GroupName[match(group$GroupCode, groupcode$GroupCode)]

makeMapJSON(edgelist=elist, names=group$Name, tags=groupNames,
            file="output.json")