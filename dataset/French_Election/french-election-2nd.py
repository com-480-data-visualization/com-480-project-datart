import pandas as pd

#dico région
dicoRegion = dict()
dicoRegion[75] = [54,74]#Poitou Charentes + Limousin : Nouvelle Acquitaine
dicoRegion[76] = [73,91]#Midi Pyrenées + Languedoc Roussillon : Occitanie
dicoRegion[32] = [31,22]#Nord pas de calais + Picardie = Haute de France
dicoRegion[84] = [82,83]#Auvergne + Rhone Alpes : Auvergne-Rhones Alpes
dicoRegion[27] = [26,43]#Bourgogne + Franche Comté :	 Bourgogne-Franche Comté
dicoRegion[44] = [42,41,21]#Aslace + Lorraine + Champgne Ardenne: Grand Est
dicoRegion[28] = [25,23]#Basse Normandie + Haute Normandie : Normandie
dicoRegion[53] = 53#Bretagne
dicoRegion[94] = 94#Corse
dicoRegion[11] = 11#Ile de France
dicoRegion[93] = 93#PACA
dicoRegion[52] = 52#Pays de Loire
dicoRegion[24] = 24#Centre Val de Loire
dicoRegion[1] = 1#Guadeloupe
dicoRegion[2] = 2#Martinique
dicoRegion[3] = 3#Guyane
dicoRegion[4] = 4#Reunion
dicoRegion[6] = 6#Mayotte

#readExcel
regio2017 = pd.read_excel('Presidentielle_2017_2.xls', sheet_name = 1)
regio2012 = pd.read_excel('Presidentielle_2012_1&2.xls',  sheet_name = 2)
regio2007 = pd.read_excel('Presidentielle_2007_1&2.xls', sheet_name = 2)
regio2002 = pd.read_excel('Presidentielle_2002_1&2.xls', sheet_name = 2)
regioArray = [regio2012,regio2007,regio2002]

#processing 2017
regionCodeAndName = regio2017[regio2017.columns[0:1]]

col = 21#first result column
temp = []
twoBest = []
while col < len(regio2017.columns):
    temp.append(regio2017.iloc[2,col])
    col += 6#shift between two result

twoBest.append(21+ 6*temp.index(max(temp)))
temp[temp.index(max(temp))] = 0
twoBest.append(21+ 6*temp.index(max(temp)))


#Basis
finalDataset = pd.DataFrame()
finalDataset["Region Code"] = regio2017.iloc[:,0]
finalDataset["Region"] = regio2017.iloc[:,1]

#--------------------------------------------------------------
#2017
finalDataset["Year"] = "2017"

#1st candidate 2017
finalDataset["FirstScore"] = regio2017.iloc[ : , twoBest[0]]
finalDataset["Surname"] = regio2017.iloc[:,twoBest[0]-4]
finalDataset["Name"] = regio2017.iloc[:,twoBest[0]-3]
finalDataset["Parti"] = None

#2nd candidate 2017
finalDataset["SecondScore"] = regio2017.iloc[ : , twoBest[1]]
finalDataset["Surname27"] = regio2017.iloc[:,twoBest[1]-4]
finalDataset["Name27"] = regio2017.iloc[:,twoBest[1]-3]
finalDataset["Parti27"] = None

#-------------------------------------------------------------------------------------
#preprocessing 2002 - 2012
regioList = regio2017.iloc[:,0]
oldRegioList = regio2012.iloc[:,0]


for y,regioYear in enumerate(regioArray):
    year = "Year" + str(y)
    print(regioYear)
    finalDataset[year] = str(y)
    for i in range(0,len(regioList)):
        print(regioList[i])
        if isinstance(dicoRegion[regioList[i]],int): #IF REGION DIDNT CHANGE
            temp = []
            twoBest = []
            col = 18  # first result column
            while col < len(regioYear.columns):
                temp.append(float(regioYear.iloc[i, col]))
                col += 6  # shift between two result*

            twoBest.append(18 + 6 * temp.index(max(temp)))
            temp[temp.index(max(temp))] = 0
            twoBest.append(18 + 6 * temp.index(max(temp)))

            # 1st candidate
            firstScore = "FirstScore"+ str(y)
            finalDataset.loc[i,firstScore] = regioYear.iloc[i, twoBest[0]]

            surname =  "Surname"+ str(y)
            finalDataset.loc[i,surname] = regioYear.iloc[i, twoBest[0] - 4]

            name = "Name"+ str(y)
            finalDataset.loc[i,name] = regioYear.iloc[i, twoBest[0] - 3]

            parti = "Parti" + str(y)
            finalDataset[parti] = None

            # 2nd candidate
            secondScore = "Second Score" +  str(y)
            finalDataset.loc[i,secondScore] = regioYear.iloc[i, twoBest[1]]

            surname2 = "Surname2" + str(y)
            finalDataset.loc[i,surname2] = regioYear.iloc[i, twoBest[1] - 4]

            name2 = "Name2"+ str(y)
            finalDataset.loc[i,name2] = regioYear.iloc[i, twoBest[1] - 3]

            parti2 = "Parti2" + str(y)
            finalDataset[parti2] = None

        else:
            index = []
            for regioCode in dicoRegion[regioList[i]]: #Find index in 2012 file of the region to merge
                for j in range(0,len(oldRegioList)):
                    if oldRegioList[j] == regioCode:
                        index.append(j)
            sumExpressed = 0
            for ind in index:
                sumExpressed += regioYear.loc[ind,"Exprimés"]

            col = 16
            votePerCandidates = []
            twoBest = []
            while col < len(regioYear.columns):
                temp = 0
                for ind in index:
                    temp += regioYear.iloc[ind, col]

                votePerCandidates.append(temp/sumExpressed*100)
                col+=6

            twoBestScore = []

            twoBest.append(16 + 6 * votePerCandidates.index(max(votePerCandidates)))
            twoBestScore.append(max(votePerCandidates))

            votePerCandidates[votePerCandidates.index(max(votePerCandidates))] = 0

            twoBestScore.append(max(votePerCandidates))
            twoBest.append(16 + 6 * votePerCandidates.index(max(votePerCandidates)))


            # 1st candidate
            firstScore = "FirstScore"+ str(y)
            finalDataset.loc[i,firstScore] = twoBestScore[0]

            surname =  "Surname"+ str(y)
            finalDataset.loc[i,surname] = regioYear.iloc[i, twoBest[0] - 2]

            name = "Name"+ str(y)
            finalDataset.loc[i,name] = regioYear.iloc[i, twoBest[0] - 1]

            parti = "Parti" + str(y)
            finalDataset[parti] = None

            # 2nd candidate
            secondScore = "Second Score" +  str(y)
            finalDataset.loc[i,secondScore] = twoBestScore[1]

            surname2 = "Surname2" + str(y)
            finalDataset.loc[i,surname2] = regioYear.iloc[i, twoBest[1] - 2]

            name2 = "Name2"+ str(y)
            finalDataset.loc[i,name2] = regioYear.iloc[i, twoBest[1] - 1]

            parti2 = "Parti2" + str(y)
            finalDataset[parti2] = None



finalDataset.to_excel("Election_gathering_second.xlsx",
             sheet_name='RegionT2',index = 0)
