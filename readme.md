## TASK 5

(ALL GROUPS)

Implement a Web-application for the fake (random) user data generation. Use your platform.

The single app page allows to:

1. select region (at least 3 different, e.g. Poland, USA, Georgia or anything you prefer)
2. specify the number of error _per record_ (two “linked” controls — slider 0..10 + binded number field with max value limit at least 1000)
3. define seed value and [Random] button to generate a random seed

If the user change anything, the table below automatically updates (20 records are generated again).

It's necessary to support infinite scrolling in the table (you show 20 records and if the user scroll down, you add next 10 records below — add new so called "page" = "batch of records").

The table show contain the following fields:

1. Index (1, 2, 3, ...) — no errors here
2. Random identifier — no errors here
3. Name + middle name + last name (in region format)
4. Address (in several possible formats, e.g. city+street+building+appartment or county+city+street+house)
5. Phone (again, it's great to have several formats, e.g. international or local ones)

Language of the names/address as well as phone codes/zip codes should be related to the region. You need to generate random data that looks somehow realistically. So, in Poland — Polish, in USA — English or Spanish, etc.

What is error? It's data entry error emulation. The end user specify number of errors PER RECORD. If errors = 0, there are no errors in user data. If error = 0.5, every record contains an error with probability 0.5 (one error per two records). 10 errors results in 10 errors in every record. Error number can be entered with a slider (0..10) or field (0..1000) — they interconnected, if change one control, other is changed too.

Support 3 type of errors - delete character in random position, add random character (from a proper alphabet) in random position, swap near characters. Type of the error have to be chosen randomly with equal probabilities (when user specifies 1000 errors, "noisy user data" should not be too long or too short).

About seed.

Of course, you do not store RANDOM data on the server. Вut you have to generate data on the server, not client. Use a single server, **_no "front" and "back"_** (seriously, in this task it just don't have sense), and no database at all (OK, you may use database for lookup tables, if you want, but you definitely don't have to :)). When the user change seed, you have to change generated data. It's important that the seed passed to RNG algorithm is combination of the user seed and page number (so, you do not re-generate pages 1..9 when the user requests page 10). How to combine - it's not really important, some kind of sum should be enough. IMPORTANT: if I enter the same seed tomorrow I have to get the same data as today (even errors) on all pages - it's especially important for optional requirement.

Of course, if you don't use a 3rd-party libary (IT'S RECOMMENDED TO USE SOME) you will need to user lookup tables with names and surnames (separately, to be able to combine) as well as cities, etc.. They have to be large enough (more than 2 names and 10 surnames), let's say hundreds of names and several thousands of surnames. Your goal - approximately — avoid full user data duplication in ~10_000_000 records.

If user changes error amount, data (names, addresses, etc.) before error application should not be changed. If I make 1 error in John, I can get Jhon, not Simth.

And again: data should look like realistic.

Application should work WITHOUT registration or/and authentication.

Optional requirement: add Export to CSV button (generate the number of pages which is displayed to user currently). You have to use ready CSV-formatter (DO NOT concatenate string by hands — e.g. address easily can contain comma and semicolon of anything).

Of course, errors should be "applied" before formatting/rendering/exporting.

**Here is an example for #5**

Let's say user opens the app and the default region is USA and app started with a random seed = 42, so he/she can get something like:

```
John Lee Smith, New York, ....
Jane Doe, Detroit, ...
Phil G. McDormand, Chicago, ...
```

Then user changes region to France:

```
Maribel Shiras, Marseille, ...
Capicine Semeaux, Nice, ...
Jaques Albane Abelard, Paris, ...
```

Then user press [Random] and seed automatically changed to some random value, e.g. 4984734:

```
Louise Picard, Paris, ...
Manon Ottile, Bordeaux, ...
Jule Elodie, Lyon, ...
```

The user enters back 42 as a seed value and get back exactly to:

```
Maribel Shiras, Marseille, ...
Capicine Semeaux, Nice, ...
Jaques Albane Abelard, Paris, ...
```

Then user increases error amount:

```
Marbziel Shras, Marseikle, ...
Capciine Semeakxu, Nce, ...
Jaqes lbane bAelard, Pars, ...
```

**About sliders+field for errors**

The slider allows setting values **from 0 to 10 **and the input field allows settings values ** from 0 to 1000**.

If user moves the slider:
`field.value = slider.value`
If user enters value into the filed:
`slider.value = Math.min(field.value, SliderMaxValue = 10)`

> You may think about it in the following way: you get the value for the algorithm from the input field, but the slider helps user to quickly set values in the range from 0 to 10.

**Again: field and slider are linked, but have different ranges.**
