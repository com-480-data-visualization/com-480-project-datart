import pandas as pd

finalDataset = pd.DataFrame()


#readExcel
data_2001 = pd.read_excel('uk_election.xlsx', sheet_name = 2)
data_2005 = pd.read_excel('uk_election.xlsx', sheet_name = 3)
data_2010 = pd.read_excel('uk_election.xlsx', sheet_name = 4)
data_2015 = pd.read_excel('uk_election.xlsx', sheet_name = 5)
data_2017 = pd.read_excel('uk_election.xlsx', sheet_name = 6)

data = [data_2001,data_2005, data_2010, data_2015, data_2017]
years = ["2001","2005","2010","2015","2017"]


temp = data_2017.groupby(['County']).sum()
finalDataset["County"] = temp.index

for y,dataYear in enumerate(data):
    summed = dataYear.groupby(['County']).sum()

    finalDataset[years[y]] = years[y]


    winner = summed.filter(regex="Votes", axis=1).idxmax(axis=1)

    for i,party in enumerate(winner) :
        firstScore = "FirstScore" + str(years[y])
        position = list(summed.columns).index(party)

        print(list(finalDataset["County"]))
        positionRow = list(finalDataset["County"]).index(summed.index[i])
        print(positionRow,years[y])
        finalDataset.loc[i, firstScore] = summed.iloc[i,position]/summed.iloc[i,0]*100


        firstParty = "Party" + str(years[y])
        finalDataset.loc[i, firstParty] = summed.columns[position-1]

        summed.iloc[i,position] = 0

    winner = summed.filter(regex = "Votes", axis = 1).idxmax(axis = 1)

    for i,party in enumerate(winner) :
        secondScore = "SecondScore"  + str(years[y])
        position = list(summed.columns).index(party)

        finalDataset.loc[i, secondScore] = summed.iloc[i,position]/summed.iloc[i,0]*100

        secondParty = "Party2" + str(years[y])
        finalDataset.loc[i, secondParty] = summed.columns[position-1]

finalDataset.to_excel("Election_gathering_department_UK.xlsx",
             sheet_name='Department',index = 0)


