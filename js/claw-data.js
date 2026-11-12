/*
 * THE BLURGBLOG — Claw machine prize pool
 * ---------------------------------------------------------------
 * Every feature film in IMDb's "Martial Arts" category rated 5.0 or lower
 * (with at least 200 votes, so the ratings mean something).
 *
 * Snapshot taken 12 Nov 2026 from:
 *   https://www.imdb.com/search/title/?interests=in0000006&title_type=feature&user_rating=1,5&num_votes=200,&sort=num_votes,desc
 * Ratings on IMDb change over time; the "See it on IMDb" link always shows the current one.
 *
 * One film per line, separated by TABS:
 *   IMDb ID    Title    Year    Rating    Votes    Runtime
 * To add a film, paste a new line in the same format (use real tab characters).
 */
window.CLAW_PRIZES = `
tt0938283	The Last Airbender	2010	3.9	183K	1h 43m
tt0357277	Elektra	2005	4.7	107K	1h 37m
tt5033998	Charlie's Angels	2019	5	86K	1h 58m
tt1098327	Dragonball: Evolution	2009	2.5	86K	1h 25m
tt0111301	Street Fighter	1994	4.2	82K	1h 42m
tt0119707	Mortal Kombat: Annihilation	1997	3.6	63K	1h 35m
tt4435072	Liger	2022	2.6	50K	2h 20m
tt0398913	DOA: Dead or Alive	2006	4.8	48K	1h 27m
tt0108308	Teenage Mutant Ninja Turtles III	1993	4.8	39K	1h 36m
tt0110657	The Next Karate Kid	1994	4.6	39K	1h 47m
tt0411951	Tekken	2010	4.8	30K	1h 32m
tt0891592	Street Fighter: The Legend of Chun-Li	2009	3.7	27K	1h 36m
tt0144964	Highlander: Endgame	2000	4.6	23K	1h 27m
tt6528290	Knights of the Zodiac	2023	4.4	19K	1h 52m
tt1653690	Ong Bak 3	2010	4.9	16K	1h 39m
tt0106761	Double Dragon	1994	4	15K	1h 36m
tt0118539	3 Ninjas: High Noon at Mega Mountain	1998	3.1	13K	1h 33m
tt7394816	Primal	2019	4.9	13K	1h 37m
tt9624766	Jiu Jitsu	2020	2.9	12K	1h 42m
tt0092548	American Ninja 2: The Confrontation	1987	5	11K	1h 30m
tt13334578	Ganapath	2023	2.6	11K	2h 13m
tt1091229	CC2C	2009	4.5	11K	2h 34m
tt0193364	The Order	2001	4.7	10K	1h 29m
tt14158554	Fistful of Vengeance	2022	4.5	8.3K	1h 36m
tt2119474	Maximum Conviction	2012	4.7	7.8K	1h 38m
tt9082020	Cold Blood	2019	4.7	7.8K	1h 31m
tt7153488	Army of One	2020	4.5	7.4K	1h 27m
tt0112255	3 Ninjas: Knuckle Up	1995	4.4	6.9K	1h 25m
tt0096804	American Ninja 3: Blood Hunt	1989	3.8	6.5K	1h 29m
tt14577300	Fortress	2021	3.3	6.3K	1h 39m
tt0101326	American Ninja 4: The Annihilation	1990	4	5.9K	1h 39m
tt35669009	Ziam	2025	4.9	5.3K	1h 35m
tt0089243	Gymkata	1985	4.4	5K	1h 30m
tt13978520	Spy Kids: Armageddon	2023	4.3	4.8K	1h 37m
tt9815714	The Hard Way	2019	4.8	4.8K	1h 32m
tt0084316	Megaforce	1982	3.7	4.7K	1h 39m
tt5851014	Savage Dog	2017	5	4.1K	1h 34m
tt7867360	Abduction	2019	4.6	4K	1h 38m
tt2611626	Force of Execution	2013	4.3	3.9K	1h 39m
tt12598606	Gunner	2024	3.2	3.7K	1h 46m
tt14132588	Arena Wars	2024	4.8	3.7K	1h 36m
tt15895490	Black Lotus	2023	4.4	3.5K	1h 33m
tt1625856	Badrinath	2011	4.6	3.2K	2h 20m
tt3462696	Tekken 2: Kazuya's Revenge	2014	2.8	3K	1h 30m
tt0111552	Undefeatable	1993	4.5	2.9K	1h 35m
tt0112483	Best of the Best 3: No Turning Back	1995	4.9	2.8K	1h 30m
tt17351056	The Last Kumite	2024	4.7	2.8K	1h 45m
tt0091003	Eliminators	1986	4.9	2.8K	1h 36m
tt7594584	Maria	2019	5	2.7K	1h 30m
tt16154506	Breakout	2023	4.6	2.7K	1h 26m
tt0106258	American Samurai	1992	5	2.4K	1h 34m
tt28487871	Sniper: G.R.I.T. - Global Response & Intelligence Team	2023	5	2.4K	1h 33m
tt12610794	Blade of the 47 Ronin	2022	4.7	2.3K	1h 47m
tt14411774	Agent	2023	3.5	2.2K	2h 36m
tt0089503	The Lost Empire	1984	4.7	2.1K	1h 23m
tt0264429	Black Mask 2: City of Masks	2002	3.8	2.1K	1h 42m
tt14037272	The System	2022	4.4	2K	1h 37m
tt0972857	Ninja Cheerleaders	2008	3.4	1.9K	1h 21m
tt0293660	The Touch	2002	4.6	1.9K	1h 43m
tt0199849	Ninja Terminator	1985	4.5	1.8K	1h 28m
tt5465970	Attrition	2018	3.8	1.7K	1h 25m
tt28622758	Jack	2025	4.6	1.7K	2h 13m
tt6329716	The Invincible Dragon	2019	4.3	1.6K	1h 25m
tt0072245	TNT Jackson	1974	4.7	1.6K	1h 12m
tt0122050	Dragon Ball: The Magic Begins	1991	4.4	1.6K	1h 26m
tt12567246	Ip Man: Kung Fu Master	2019	4.7	1.4K	1h 24m
tt0074213	Black Samurai	1976	4.8	1.1K	1h 28m
tt0070705	Yellow-Faced Tiger	1974	4.4	1K	1h 28m
tt1406157	High-Kick Girl!	2009	4.7	994	1h 21m
tt0077408	Death Dimension	1978	4.1	990	1h 28m
tt9272826	Johnny Z	2022	3	953	1h 35m
tt17156822	Battle for Saipan	2022	3.7	900	1h 34m
tt0104667	Lady Dragon	1992	5	899	1h 37m
tt4642936	Warrior Savitri	2016	2.9	898	2h 16m
tt2302601	Evil Feed	2013	4	872	1h 30m
tt0126698	Tiger Claws II	1996	4.9	845	1h 32m
tt0337887	Sledge: The Untold Story	2005	3.9	838	1h 23m
tt0129992	High Voltage	1997	4.6	824	1h 35m
tt1784600	Bangkok Revenge	2011	4.9	810	1h 22m
tt14469386	Jade	2025	3.7	786	1h 28m
tt1876517	Legend of Kung Fu Rabbit	2011	3.3	772	1h 29m
tt1857797	Naked Soldier	2012	4.8	770	1h 34m
tt0390463	Sci-Fighter	2004	2.8	765	1h 30m
tt0074383	Death Machines	1976	4.1	759	1h 33m
tt0140859	Bloodfight	1989	4.7	758	1h 36m
tt0082611	Kill Squad	1981	4.9	751	1h 25m
tt1144797	Death Warrior	2009	2.9	751	1h 30m
tt1133594	Shaolin Girl	2008	4.4	749	1h 47m
tt0260136	The Avenging Fist	2001	4.3	748	1h 32m
tt0086051	One Down, Two to go	1982	4.5	745	1h 29m
tt0166674	Karate Warrior	1987	4.6	726	1h 34m
tt0094384	Zombie vs. Ninja	1989	3.1	643	1h 28m
tt30177354	Phoenix	2025	4.9	634	1h 58m
tt0132933	Dynamite Brothers	1974	3.8	626	1h 30m
tt14773940	24 Hours with Gaspar	2023	4.8	615	1h 38m
tt1121986	Money Fight	2012	3.8	615	1h 59m
tt13399862	African Kung-Fu Nazis	2019	3.9	609	1h 24m
tt0278527	Karate Girl	1973	3.6	607	1h 25m
tt0107762	Out for Blood	1992	4.8	585	1h 30m
tt3393762	The Martial Arts Kid	2015	5	571	1h 43m
tt1851871	Choyleefut: Speed of Light	2011	4.3	555	1h 33m
tt0199861	Ninja the Protector	1986	3.7	551	1h 32m
tt0103067	Terror in Beverly Hills	1989	3.3	521	1h 28m
tt30253785	Warrior Awang and Master Tok Gajah	2024	4.7	514	1h 58m
tt0457748	Adventures of Johnny Tao	2006	4.1	504	1h 30m
tt1737796	Alien Rising	2013	3	496	1h 33m
tt0117911	Tiger Heart	1996	4.3	468	1h 30m
tt0074247	Bruce Lee Fights Back from the Grave	1976	3.7	459	1h 24m
tt0228486	King Kung Fu	1976	4.8	455	1h 35m
tt1274418	Fist of the Warrior	2007	3.6	449	1h 28m
tt0102535	Night of the Warrior	1991	3.8	444	1h 39m
tt0092733	Catch the Heat	1987	5	420	1h 27m
tt1485096	The Prodigy	2009	1.8	416	1h 17m
tt0091130	Golden Ninja Warrior	1986	3.7	416	1h 25m
tt10079652	Art of Eight Limbs	2024	4	415	1h 41m
tt0087658	Macho Man	1985	4.2	411	1h 25m
tt1825731	Just Call Me Nobody	2010	4.1	401	1h 59m
tt32368033	Bangkok Dog	2024	4.6	395	1h 29m
tt1149582	Brave	2007	4	388	1h 32m
tt0186483	The Real Bruce Lee	1977	4.4	382	1h 33m
tt5779650	The Adventures of Panda Warrior	2012	1.7	380	1h 18m
tt0280496	Body Weapon	1999	4.2	375	1h 31m
tt1595637	Deadly Closure	2010	2.3	370	1h 40m
tt2839312	Barrio Brawler	2013	4.3	368	1h 31m
tt6567406	Muthuramalingam	2017	1.7	355	2h 17m
tt0164336	American Kickboxer 2	1993	4.2	351	1h 33m
tt0108313	Terminator Woman	1993	4	345	1h 45m
tt0077724	The Image of Bruce Lee	1978	4.9	345	1h 31m
tt0081061	The Little Dragons	1979	4.4	337	1h 30m
tt1392899	Ninja Masters	2009	4.5	328	1h 27m
tt0180781	Kill a Dragon	1967	4.6	322	1h 31m
tt0083528	Ninja in the Claws of the CIA	1981	4.4	292	1h 15m
tt1356802	Four Dragons	2008	3.5	281	1h 32m
tt0077556	Fists of Bruce Lee	1978	3.9	267	1h 33m
tt6166322	John Kincaid Unleashed	2017	3.6	264	1h 42m
tt0101928	Full Impact	1993	3.2	260	1h 12m
tt19865716	Absolute Dominion	2025	4.4	258	1h 40m
tt12222074	Fight of Fury	2020	3.7	239	1h 21m
tt1455619	Hand 2 Hand	2011	3.7	211	1h 32m
tt0317333	Extreme Challenge	2001	5	203	1h 29m
`.trim().split("\n").map(function (line) {
  var f = line.split("\t");
  return { id: f[0], title: f[1], year: +f[2], rating: +f[3], votes: f[4], runtime: f[5] };
});
