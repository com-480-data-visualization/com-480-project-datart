# MILESTONE 1
<h3> DATASETS:</h3>

<p>The datasets for this vizualisation are separated between the two countries we will base our vizualisation on. 
On one hand, we will process the data of the French election from 2002 to 2017 in parallel of the evolution of the French population per region and per department. 
On the other hand, we will process the equivalent datasets for the United Kingdoms. 
Since each dataset is different, you can find in the following paragraph a description of those and a forecast of the preprocessing needed for each. 
</p>

<h4> French part</h4>
<h5> French election</h5>
The datasets describing the results of the French election furnish the essential information we need to perform the visualizations. Each file regroup the election results per region and per department in France for a specific year. 
The data are well organized in each file but no information about the different columns can be found. Even if the function of each column is quite easy to deduce, some details can be missed. 
However, key information is missing such as the political party of the candidates, those will need to be added in the preprocessing. 
Moreover, the fact each election has its own file makes the gathering more complicated. Indeed, the data are not organized the same between each file (ie each election) and the preprocessing part will need to take care of the differences to gather the data. 
One important thing to note which is specific to those datasets is the difference between the region for each year. The French regions have been merged in 2015 and therefore, the regional results of the election between 2002 and 2015 are different from the 2017 elections. Merge the results for the region from 2002 to 2015 will be a huge part of the preprocessing. 

<h5> French population</h5>


<h4> United Kingdoms part</h4>
<h5> UK election</h5>

The dataset describing the results of the UK election is really complete and has the great particularity of being unique. Since every election result is contained in one single file, the format and the organization of the different data over the years is very similar. Way less preprocessing is needed. 
However, some counties (small region in the UK) exists in 2001 and disappear after 2005. Moreover, the fact that the UK elections include 3 different countries (England, Scotland and Ireland) make the data way sparser. Indeed, each country has its own political parties and the management of the region changes way more than in an unified system.
The preprocessing will need to take care of those specificities to gather every election with the wanted information in one single file. 

<h5> UK population </h5>

The UK population datasets contain the information of features of British residents that may make a difference to the election result. Among them, we have the statistics of population's age ranges and genders from 2001 to 2018 in different regions of 3 UK countries, and it's acquired from StatsWales. Data of revenue and tax also reflect the economic status in one UK region, and the information from 2011 to 2018 is also available from dataset offered by UK government. Besides, ethnicity proportion may also be a factor in election, and we get the statistics in 2011 from UK Office for National Statistics.
To conclude, for Uk population, we scratch the dataset of ages, gender, revenues, tax and ethnicity in UK regions.

<h3>  PROBLEMATIC:</h3>

<h3>  EXPLORATORY DATA ANALYSIS:</h3>
<h4> French part</h4>
<h5> French election</h5>
The French election set is composed of 4 different datasets. The three first describing the results of the first and second round of the French election from 2002 to 2012. 
We can find in those datasets the departmental and regional results. In each of these datasets, the regions and department have the same name, however not the same code.
As we will treat only the first round of the election, we will detail only this sheet. 
For these datasets, the regional and department sheets contain the results for all the candidates without any missing values.
For each candidate we can find their gender, name, surname, number of vote per region/department, vote share among the registered voters and among the total expressed votes. 
We can also find the name of the department and region with their respective code. 

The 2017 dataset contains the same information but the region are different and the organisation of the features in the datasets is also different. The white votes are more detailled than in the previous datasets. 
The 2017 dataset is also complete even if some numbers are considered as strings. We can deal with this manually with excel before the preprocessing.

<h5> French population</h5>


<h4> United Kingdoms part</h4>
<h5> UK election</h5>
The UK election set is composed of one unique file containing all the necessary data from 1914 to 2018. This datasets contains almost the same information than the French one. 
However, the political system in the UK makes the voters vote for a party and not for a politican. Therefore, there are no names associated with the vote shares but political party's names. 

From year to year, the county (equivalent of the French department) and the region change. Moreover, they sometimes aren't written the same way (Frau & Mau becomes Frau and Mau) which can complicate the preprocessing. 

Otherwise, the dataset is really complete without any missing values. 

<h5> UK population</h5>

Similar to the preprocessing in election data, the UK population datasets are also complete and well formed in xls or csv. The age and tax datasets are formed in the same way in unique file through different years. The way of data presentation is almost the same as the election data, only replacing the vote string data by population numerical data. The ethnicity is more messy but can be reformed in the same way by simple operations including merging and concatenation. There are some tiny difference among the name of Uk regions, but it can also be handled with text processing techniques. Detailed statistics analysis will be presented in later visualization.


<h3>  RELATED WORK:</h3>
