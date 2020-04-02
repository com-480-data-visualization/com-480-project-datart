# MILESTONE 1
<h3>1. DATASETS:</h3>

<p>The datasets for this vizualisation are separated between the two countries we will base our vizualisation on. 
On one hand, we will process the data of the French election from 2002 to 2017 in parallel of the evolution of the French population per region and per department. 
On the other hand, we will process the equivalent datasets for the United Kingdoms. 
Since each dataset is different, you can find in the following paragraph a description of those and a forecast of the preprocessing needed for each. 
</p>

<h4><ins> French part </ins></h4>
<h5> French election</h5>
The datasets describing the results of the French election furnish the essential information we need to perform the visualizations. Each file regroup the election results per region and per department in France for a specific year. 
The data are well organized in each file but no information about the different columns can be found. Even if the function of each column is quite easy to deduce, some details can be missed. 
However, key information is missing such as the political party of the candidates, those will need to be added in the preprocessing. 
Moreover, the fact each election has its own file makes the gathering more complicated. Indeed, the data are not organized the same between each file (ie each election) and the preprocessing part will need to take care of the differences to gather the data. 
One important thing to note which is specific to those datasets is the difference between the region for each year. The French regions have been merged in 2015 and therefore, the regional results of the election between 2002 and 2015 are different from the 2017 elections. Merge the results for the region from 2002 to 2015 will be a huge part of the preprocessing. 

<h5> French population</h5>

We have in total 2 categories of datasets, used in our project to describe the french population :

	* Description of the population based on age (5-year and 119-year age groups) and gender per year and per region/department
	* Description of the population based on revenue and taxes per year and per region only

We obtained this data from a french government agency called "INSEE" (National Institute of statistical and economics studies).

At first, these datasets were splitted by year and some of them were written manually (some of the columns were not aligned). Consequently, we had to clean and pre-process this data in order to group it in one single dataframe (for every category) by creating a "year" column and in the first category a "gender" because it was previously only a header.

Overall, the quality of the data is good because the origin is a well-renowned government agency.

<h4><ins> British Part </ins></h4>
<h5> UK election</h5>

The dataset describing the results of the UK election is really complete and has the great particularity of being unique. Since every election result is contained in one single file, the format and the organization of the different data over the years is very similar. Way less preprocessing is needed. 
However, some counties (small region in the UK) exists in 2001 and disappear after 2005. Moreover, the fact that the UK elections include 3 different countries (England, Scotland and Ireland) make the data way sparser. Indeed, each country has its own political parties and the management of the region changes way more than in an unified system.
The preprocessing will need to take care of those specificities to gather every election with the wanted information in one single file. 

<h5> UK population </h5>

The UK population datasets contain the information of features of British residents that may make a difference to the election result. Among them, we have the statistics of population's age ranges and genders from 2001 to 2018 in different regions of 3 UK countries, and it's acquired from StatsWales. Data of revenue and tax also reflect the economic status in one UK region, and the information from 2011 to 2018 is also available from dataset offered by UK government. Besides, ethnicity proportion may also be a factor in election, and we get the statistics in 2011 from UK Office for National Statistics.
To conclude, for Uk population, we scratch the dataset of ages, gender, revenues, tax and ethnicity in UK regions.

<h3>2. PROBLEMATIC: </h3>

<h3>3. EXPLORATORY DATA ANALYSIS:</h3>
<h4><ins> French part </ins></h4>
<h5> French election</h5>
The French election set is composed of 4 different datasets. In 3 out of 4 of those dataset, we can find the same features. 
We can detail the dataframe as following : 

	* three categorical columns per candidate for his/her gender, name and surname  
	* one categorical column for the region (or department) and the region's (or department's) code
	* one integer and two float columns per candidate for the number of voters per region/department and for the vote shares
	* the rests are float or integer column for the numnber of white voters or total voters
For the 2017 election dataset, we can find more float/integer columns as the white votes are more detailled. 

Each of those dataset is complete without any missing value. 
The size of each dataset depends of the number of candidates for each election.

<h5> French population</h5>

After pre-processing our data, we need to explain how our dataframes are built and how much insight do they have.
So in our case, we have two categories of dataframes :

	* for the population's gender and age : two categorical columns for the "gender" and "region" (or "department") and the rest are integer columns for the number of people in each group (age groups specifically of 5-year range or 19-year range) and the year
	* for the population's revenu : one categorical column for the "region" and the rest are integer columns representing (per year and in average) the gross salary, gross surplus, social contributions of employed/non-employed citizens, taxes, cash benefit, available gross revenue and the year of course.

The data used in order to understand the french population using our criterias also contains useful statistical insight : 

	* the size of the first dataframe is :
	* the size of the second dataframe is :



<h4><ins> British part</ins></h4>
<h5> UK election</h5>
The UK election set is composed of one unique file containing all the necessary data from 1914 to 2018. This dataset contains almost the same information than the French one. 
However, the political system in the UK makes the voters vote for a party and not for a politican. Therefore, there are no names/surname/gender associated with the vote shares but political party's names. 

We can find in the dataset the following dataframes: 

     * 5 categorical column for the region, the county, the country the constituency and the constituency's code. 
     * 1 categorical column per political party 
     * 1 integer and 1 float column for the number of voters for each party and their vote shares
     * 1 integer and 1 float column for the total votes and the turnout percentage

This format is repeated for every year. The sheets from 1914 to 1997 has been deleted manually to lighten the file. 
The size of each of those datasets depends of the number of political parties and therefore varies according to the year. 
Otherwise, the dataset is really complete without any missing values. 

<h5> UK population</h5>

Similar to the preprocessing in election data, the UK population datasets are also complete and well formed in xls or csv. The age and tax datasets are formed in the same way in unique file through different years. The way of data presentation is almost the same as the election data, only replacing the vote string data by population numerical data. The ethnicity is more messy but can be reformed in the same way by simple operations including merging and concatenation. There are some tiny difference among the name of Uk regions, but it can also be handled with text processing techniques. Detailed statistics analysis will be presented in later visualization.


<h3>4. RELATED WORK:</h3>
<h5> What others have already done with that data?</h5>
As the data found are public political data, a lot of analysis has been made from these datasets. From political election analysis and vizualisation. 
However, we couldn't find a media source quoting directly this dataset. *

<h5> Why is your approach original</h5>
Our approach is original in the sense that we don't limit ourselve to the analysis of one political election.
First, we try to correlate the evolution of the results of the election with the evolution of the population on several criteria. 
Since the environment of the population is changing from territory to territoy and that the environment partly conditions the vote ; the correlation should be visible. 

Moreover, media analysis often limit themselves to their country. Compare two countries that have a political system  different but with a population having a common culture remains an original approach. 
The vizualisation remains perfect for this since the side by side comparaison will show the similarities and idfferences way more edxplicitely.


<h5> What source of inspiration do you take? Visualizations that you found on other websites or magazines</h5>

[Le Monde-loyer](https://www.lemonde.fr/les-decodeurs/article/2019/11/15/loyers-a-paris-toulouse-lille-visualisez-quels-quartiers-correspondent-a-votre-budget_6019334_4355770.html)
[Le Monde-tobacco](https://www.lemonde.fr/les-decodeurs/article/2019/01/29/ou-fume-t-on-le-plus-en-france-ou-souffre-t-on-le-plus-de-maladies-liees-au-tabagisme_5416235_4355770.html)
[Le Monde-multipleCard](https://www.lemonde.fr/les-decodeurs/article/2019/05/27/l-effondrement-de-lr-la-progression-d-eelv-et-la-stabilite-de-la-gauche-radicale-en-cartes_5468011_4355770.html)
[NYT-election](https://driven-by-data.net/2016/11/04/red-blue.html)
