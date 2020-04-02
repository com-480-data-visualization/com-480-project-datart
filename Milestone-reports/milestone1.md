# MILESTONE 1
<h3>1. DATASETS:</h3>

<p>The datasets for this vizualisation are splitted between the two countries we will base our vizualisation on. 
On one hand, we will process the data of the French election from 2002 to 2017 in parallel of the evolution of the French population per region and per department. 
On the other hand, we will process the equivalent datasets for the United Kingdoms. 
We obtained those datasets from french and UK government agencies. Hence, the quality of each dataset is overall trustworthy and great.

</p>

<h4><ins> French part </ins></h4>
<h5> French election</h5>
The datasets describing the results of the French election provides the essential information we need to perform the visualizations. 
Each file regroup the election results per region and per department in France for a specific year. 
However, key information is missing such as the political party of the candidates, those will need to be added in the preprocessing. 
Moreover, the data are not organized the same way between each file (i.e each election) and the preprocessing part will need to take care of the differences to gather the data. 
One important thing to note is the difference between the region for each year. The French regions have been merged in 2015 and therefore, the regional results of the election between 2002 and 2015 are different from the 2017 elections. 
Merge the results for the region from 2002 to 2015 will be a huge part of the preprocessing. 

<h5> French population</h5>

We have in total 2 categories of datasets, used in our project for describing the french population:  

* Description based on <ins>age</ins> (19-year age groups) and <ins>gender</ins> per year and per region/department (between 2002 and 2017)
* Description based on <ins>revenue and taxes</ins> per year and per region only (between 2002 and 2015)

Also, we had to clean and pre-process this data in order to group it in one single dataframe (for every category) by creating a "year" column or a "gender" categorical column (previously headers in the excel files).

<h4><ins> British Part </ins></h4>
<h5> UK election</h5>

The UK datasets contains every election result  contained in one single file.Therefore, the format and the organization of the different data over the years is very similar. Way less preprocessing is needed. 
However, some counties (small region in the UK) exist in 2001 and disappear after 2005. Moreover, the fact that the UK elections include 3 different countries (England, Scotland and Ireland) make the data way sparser. 
The preprocessing will need to take care of those specificities to gather every election with the wanted information in one single file. 

<h5> UK population </h5>

The UK population datasets contain the information of features of British residents that may make a difference to the election result. Among them, we have the statistics of population's age ranges and genders from 2001 to 2018 in different regions of 3 UK countries, and it's acquired from StatsWales. Data of revenue and tax also reflect the economic status in one UK region, and the information from 2011 to 2018 is also available from dataset offered by UK government. To conclude, for Uk population, we scratch the dataset of ages, gender, revenues and tax in UK regions.

     * Description of the population by different age ranges and gender per year and per region.
     * Description of the population by different levels of revenue and taxes per year and per region.

<h3>2. PROBLEMATIC: </h3>

<h5> What are we trying to show with our visualization?  What are the motivation and target audience of our project? </h5>

Our objective is to visualize the election of France and Britain in different departments/regions through time, and the impact of different population features on the election results. </br> 
The visualization is supposed to provide a straightforward view and insight of how the 2 countries differ from each other concerning the election and related features. Also, readers can have a clearer picture of the correlation of population features on election and how the impact differ among regions or countries.

 Our target audience may be the politicians or political scholars who intend to figure out some important factors for the election and difference between countries or regions. We may also target residents from France or the United Kingdom who would like to know some transparent election details.

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
After the gathering and the preprocessing of those files, we get: 

    * a size for a first dataframe for the region of 19x38 
	* a size for a first dataframe for the departments of 107x38 

<h5> French population</h5>

After pre-processing our data, we need to explain how our dataframes are built and how much insight do they give.
So in our case, we have two categories of dataframes:

* for the population's gender and age : two categorical columns for the "gender" and "region", and the other columns are integer columns with the number of people in each group (we have 5 age groups age groups of 19-year ranges specifically) or the year
* for the population's revenue : one categorical column for the "region" and the other columns are integer columns representing (per year and in average) the gross salary, gross surplus, social contributions of employed/non-employed citizens, taxes, cash benefit, available gross revenue and the year of course.

The data used in order to describe the french population can be represented after pre-processing as: 

* the size of the first dataframe is : 648 rows and 9 columns
* the size of the second dataframe is : 322 rows and 9 columns

we also described in more details the statistical analysis of our data directly on the dedicated [notebook](../dataset/population-france/population-EDA.ipynb) (with added analysis and preliminary plots).

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

Similar to the preprocessing in election data, the UK population datasets are also complete and well formed in xls or csv. The age and tax datasets are formed in the same way in unique file through different years. The way of data presentation is almost the same as the election data, only replacing the vote string data by population numerical data. There are some tiny difference among the name of Uk regions, but it can also be handled with text processing techniques. Detailed statistics analysis will be presented in later visualization. The 2 categories of dataframes after simple preprocessing can be summurized as follows:

   * for the population's gender and age : The rows show different age ranges in one year, and age ranges of different years are concatenated in rows. For each year, there are 12 different age range rows. In the columns, there are 37 different regions in England, Wales, Scotland and North Ireland. The interger number represents the number of people in the corresponding age-year row and region column. There is one other same dataframe that counts the number of male/female population.

   * for the population's revenue and tax : The rows are the income ranges (totally 10 ranges) in one particular region and the columns represent the statistics of individuals and amounts of 6 different income/tax categories, including self-employment income, employment income, pension income, other income, total income and total tax. 


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

In this part, we tried to separate the political inspirations from the non-political ones.</br>
Indeed our visualization project is clearly oriented toward politics and demographics but we wanted to find some original plots in order to express our results. </br>
Below you will find some examples from websites and well-known magazines :

<h6>Political:</h6>

[Le Monde-loyer](https://www.lemonde.fr/les-decodeurs/article/2019/11/15/loyers-a-paris-toulouse-lille-visualisez-quels-quartiers-correspondent-a-votre-budget_6019334_4355770.html)
</br>

[Le Monde-party-analysis](https://www.lemonde.fr/les-decodeurs/article/2019/05/27/l-effondrement-de-lr-la-progression-d-eelv-et-la-stabilite-de-la-gauche-radicale-en-cartes_5468011_4355770.html)
</br>

[NYT-election](https://driven-by-data.net/2016/11/04/red-blue.html)
</br>

[Storybench](https://www.storybench.org/ten-ways-you-might-consider-visualizing-political-issues-and-ideologies-this-election/)
</br>

<h6>Non-political:</h6>

[Le Monde-tobacco](https://www.lemonde.fr/les-decodeurs/article/2019/01/29/ou-fume-t-on-le-plus-en-france-ou-souffre-t-on-le-plus-de-maladies-liees-au-tabagisme_5416235_4355770.html)
</br>

[DataViz-Project](https://datavizproject.com/)
</br>

[blog-examples](https://visme.co/blog/best-data-visualizations/)
</br>

<h6>Some visual examples:</h6>

<ins>Data vizualisation, LGBTQI+ rights per country</ins>

![picture alt](https://image.noelshack.com/fichiers/2020/14/4/1585847056-whatsapp-image-2020-03-30-at-12-22-29.jpeg)

<ins>Mapping politically polarized cities</ins>

![picture alt](https://i0.wp.com/flowingdata.com/wp-content/uploads/2019/05/Political-polarization-by-FiveThirtyEight.png?w=1200&ssl=1)
