# MILESTONE 1
<h3>1. DATASETS:</h3>

<p>For our Data Visualization project, we will study two countries : France and UK.
On one hand, we will process the data of the French elections between 2002 and 2017 in parallel with the evolution of the French population per region and per department.
On the other hand, we will process the equivalent datasets from the United Kingdom.
We obtained those datasets from french and UK government agencies. Hence, the quality of each dataset is overall trustworthy and reliable.

</p>

<h4><ins> French part </ins></h4>
<h5> French election</h5>
The datasets describing the results of the French election provide the essential information we need to perform the visualizations.
Each file regroups the election results per region and per department in France for a specific year.
However, key information is missing such as the political party of the candidates, which will need to be added in the preprocessing.
Moreover, the data is not organized the same way between each file (i.e each election) and the preprocessing part will need to take care of these differences in order to gather the data.
One important thing to note is the difference between the regions for each year. The French regions have been merged in 2015 and therefore, the regional results of the elections between 2002 and 2015 are different from ones of the 2017 elections, so it needs some preprocessing.

<h5> French population</h5>

We have in total 2 categories of datasets used in our project for describing the french population:  

* Description based on <ins>age</ins> (19-year age groups) and <ins>gender</ins> per year and per region/department (between 2002 and 2017)
* Description based on <ins>revenue and taxes</ins> per year and per region only (between 2002 and 2015)

Also, we had to clean and pre-process this data in order to group it in one single dataframe (for every category) by creating a "year" column or a "gender" categorical column (previously headers in the excel files).

<h4><ins> British Part </ins></h4>
<h5> UK election</h5>

The UK datasets contain every election result within one single file. Therefore, the format and the organization of the different data over the years is very similar. Way less preprocessing is needed.
However, some counties (small regions in the UK) existed in 2001 and disappeared after 2005. Moreover, the fact that the UK elections include 3 different countries (England, Scotland and Ireland) make the data way sparser.
The preprocessing will need to take care of those specificities to gather every election with the wanted information in one single file.

<h5> UK population </h5>

The UK population datasets contain the information of features from British residents which may make a difference to the election's results. Among them, we have the statistics of population's age ranges and genders from 2001 to 2018 in different regions of 3 UK countries which is acquired from StatsWales. Data of revenue and tax also reflect the economic status in one UK region, and the information from 2011 to 2018 is also available from dataset offered by UK government.</br>
To conclude, for Uk population, we scratch the dataset of ages, gender, revenues and tax in UK regions:

* Description of the population by different age groups and gender per year and per region.
* Description of the population by different levels of revenue and taxes per year and per region.

<h3>2. PROBLEMATIC: </h3>

<h5> What are we trying to show with our visualization?  What is the motivation and target audience of our project? </h5>

Our goal is to visualize the elections in France and Britain in different departments/regions through time, as well as the impact of different population features on the election results. </br>
The visualization is supposed to provide a straight forward view and insight of how the 2 countries differ from each other regarding the election and the related features. Also, readers will have a clearer picture of the correlation between population features in the election and how the impact differ among regions or countries.

 Our target audience may also be  politicians or political scholars who intend to figure out some important factors for the elections and differences between countries or regions. We may also target residents from France or the United Kingdom who would like to have some transparent details about the elections.

<h3>3. EXPLORATORY DATA ANALYSIS:</h3>
<h4><ins> French part </ins></h4>
<h5> French election</h5>
The French election set is composed of 4 different files.

In 3 out of 4 of the datasets, we can find the same features:
* three categorical columns per candidate for his/her gender, name and surname  
* one categorical column for the region (or department) and the region's (or department's) code
* one integer and two float columns per candidate for the number of voters per region/department and for the vote shares
* the rests are float or integer columns for the number of white votes or total votes
For the 2017 election dataset, we can find more float/integer columns as the white votes are more detailed.

Each of these datasets is complete without any missing value with the following size after preprocessing:

* a size for a first dataframe for the region of 19x38
* a size for a first dataframe for the departments of 107x38

<h5> French population</h5>

After pre-processing our data, we need to explain how our dataframes are built and how much insight they give.
So in our case, we have two categories of dataframes:

* for the population's gender and age : two categorical columns for the "gender" and "region", and the other columns are integer columns with the number of people in each group (we have 5 age groups of 19-year ranges specifically) or the year.
* for the population's revenue : one categorical column for the "region" and the other columns are integer columns representing (per year and in average) the gross salary, gross surplus, social contributions of employed/non-employed citizens, taxes, cash benefit, available gross revenue and the year of course.

The data used in order to describe the french population can be represented after pre-processing as:

* the size of the first dataframe : 648 rows and 9 columns
* the size of the second dataframe : 322 rows and 9 columns

We also described with more details the statistical analysis of our data directly on the dedicated [notebook](../dataset/population-france/population-EDA.ipynb) (with added analysis and preliminary plots).

<h4><ins> British part</ins></h4>
<h5> UK election</h5>
This dataset contains almost the same information as the french one.
However, the political system in the UK makes the voters vote for a party and not for a politican.
We can thus find in the dataset the following dataframes:

* 5 categorical column for the region, the county, the country the constituency and the constituency's code.
* 1 categorical column per political party
* 1 integer and 1 float column for the number of voters for each party and their vote shares
* 1 integer and 1 float column for the total votes and the turnout percentage

This format is repeated for every year.
After preprocessing, the file for departments is 50x26 and for the region 13x26.
Otherwise, the dataset is truly complete without any missing values.

<h5> UK population</h5>

Similarly to the preprocessing in election data, the UK population datasets are also complete and well formed in xls or csv. The age and tax datasets are formed in the same way in a unique file for the different years. After simple text processing and preprocessing, the 2 categories of dataframes after simple preprocessing can be summarized as follows:

   * for the population's gender and age : The rows show different age ranges in one year, and age ranges of different years are concatenated in rows. For each year, there are 12 different age range rows. In the columns, there are 37 different regions in England, Wales, Scotland and North Ireland. The integer number represents the number of people in the corresponding age group row and region column. There is one other similar dataframe which counts the number of male/female population.

   * for the population's revenue and tax : The rows are the income ranges (totally 10 ranges) in one particular region and the columns represent the statistics of individuals and amounts of 6 different income/tax categories, including self-employment income, employment income, pension income, other income, total income and total tax.


<h3>4. RELATED WORK:</h3>
<h5> What have others already done with that data?</h5>
As the data found are public political data, a lot of analysis has been made from these datasets (politics analysis and vizualisation).
However, we could not find any media source quoting directly the datasets we are using for this project.

<h5> Why is your approach original?</h5>

Our approach is original in the sense that we do not limit ourselves to the analysis of one political election.</br>
First, we try to correlate the evolution of the results of the elections with the evolution of the population on several criterias.</br>
Since the environment of the population is changing from territory to territory (or region to region) and that the environment partly conditions the vote ; the correlation should be visible and pertinent.

Moreover, media often limit their analysis to their own country. Comparing two countries which have different political systems but with populationd having similar socio-cultural systems remains an original approach. </br>
Consequently, the visualization project is a perfect example of analysis, since the side by side comparison will show the similarities and differences way more explicitly.


<h5> What source of inspiration do you take? Visualizations that you found on other websites or magazines</h5>

In this part, we tried to separate the political inspirations from the non-political ones.</br>
Indeed our visualization project is clearly oriented towards politics and demographics but we wanted to find some original plots in order to express our results. </br>
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


<h5>This dataset was not explored before in any other context (ML or ADA...)</h5>
