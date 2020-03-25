import pandas as pd

#readExcel
regio2017 = pd.read_excel('Presidentielle_2017_1.xls', sheet_name = 2)
regio2012 = pd.read_excel('Presidentielle_2012_1&2.xls',  sheet_name = 3)
regio2007 = pd.read_excel('Presidentielle_2007_1&2.xls', sheet_name = 3)
regio2002 = pd.read_excel('Presidentielle_2002_1&2.xls', sheet_name = 3)

dicoParti = dict()
dicoParti["LE PEN"] = "FN"
dicoParti["CHIRAC"] = "FN"
dicoParti["MACRON"] = "LREM"
dicoParti["HOLLANDE"] = "PS"
dicoParti["JOSPIN"] = "PS"
dicoParti["ROYAL"] = "PS"
dicoParti["TAUBIRA"] = "PS"
dicoParti["SARKOZY"] = "LR"
dicoParti["FILLON"] = "LR"
dicoParti["MÉLENCHON"] = "LR"
dicoParti["BAYROU"] = "MoDem"
dicoParti["CHEVENEMENT"] = "PS"

regioArray = [regio2017,regio2012,regio2007,regio2002]
years = ["2017","2012","2007","2002"]
regioCode = regio2017.iloc[:,0]
regioName = regio2017.iloc[:,1]

finalDataset = pd.DataFrame()
finalDataset["Region Code"] = regioCode
finalDataset["Region Name"] = regioName



for y,regioYear in enumerate(regioArray):
    year = "Year" + years[y]
    finalDataset[year] = years[y]
    for i in range(0,len(regioYear)):
        col = 18
        temp = []
        twoBest = []
        while col < len(regioYear.columns):
            temp.append(float(regioYear.iloc[i, col]))
            col += 6
        twoBest.append(18 + 6 * temp.index(max(temp)))
        temp[temp.index(max(temp))] = 0
        twoBest.append(18 + 6 * temp.index(max(temp)))

        # 1st candidate
        firstScore = "FirstScore" + str(y)
        finalDataset.loc[i, firstScore] = regioYear.iloc[i, twoBest[0]]

        surname = "Surname" + str(y)
        finalDataset.loc[i, surname] = regioYear.iloc[i, twoBest[0] - 4]

        name = "Name" + str(y)
        finalDataset.loc[i, name] = regioYear.iloc[i, twoBest[0] - 3]

        parti = "Parti" + str(y)
        print(years[y], regioYear.iloc[i, twoBest[0]],i)
        finalDataset.loc[i,parti] = dicoParti[regioYear.iloc[i, twoBest[1] - 4]]

        # 2nd candidate
        secondScore = "Second Score" + str(y)
        finalDataset.loc[i, secondScore] = regioYear.iloc[i, twoBest[1]]

        surname2 = "Surname2" + str(y)
        finalDataset.loc[i, surname2] = regioYear.iloc[i, twoBest[1] - 4]

        name2 = "Name2" + str(y)
        finalDataset.loc[i, name2] = regioYear.iloc[i, twoBest[1] - 3]

        parti2 = "Parti2" + str(y)
        print(years[y],regioYear.iloc[i, twoBest[1]],i)
        finalDataset.loc[i,parti2] = dicoParti[regioYear.iloc[i, twoBest[1] - 4]]


finalDataset.to_excel("Election_gathering_department.xlsx",
             sheet_name='DepartmentT1',index = 0)


