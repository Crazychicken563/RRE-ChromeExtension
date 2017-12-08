function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
}

function setUpDomForRES() {
    const RESSubscriptionsDIVEmpty =
        `<div id="srDropdownContainer"></div>
        <table id="srList"></table>`;
    document.querySelector('head').innerHTML = RESSubscriptionsDIVEmpty;

    const RESSubscriptionsDIV =
        `<thead><tr><td width="200">subreddit <div class="sortAsc"></div></td><td width="120">Last Visited</td><td style="width: 50px;"><a style="float: right;" href="/subreddits/">View all »</a></td></tr></thead><tbody><tr><td><a href="/r/Art/">Art</a></td><td class="RESvisited">Never</td><td class="RESshortcut" data-subreddit="Art">+shortcut</td></tr><tr><td><a href="/r/AskReddit/">AskReddit</a></td><td class="RESvisited">Never</td><td class="RESshortcut" data-subreddit="AskReddit">+shortcut</td></tr><tr><td><a href="/r/aww/">aww</a></td><td class="RESvisited">Never</td><td class="RESshortcut" data-subreddit="aww">+shortcut</td></tr><tr><td><a href="/r/cars/">cars</a></td><td class="RESvisited">Never</td><td class="RESshortcut" data-subreddit="cars">+shortcut</td></tr><tr><td><a href="/r/food/">food</a></td><td class="RESvisited">Never</td><td class="RESshortcut" data-subreddit="food">+shortcut</td></tr><tr><td><a href="/r/gadgets/">gadgets</a></td><td class="RESvisited">Never</td><td class="RESshortcut" data-subreddit="gadgets">+shortcut</td></tr><tr><td><a href="/r/gaming/">gaming</a></td><td class="RESvisited">Never</td><td class="RESshortcut" data-subreddit="gaming">+shortcut</td></tr><tr><td><a href="/r/pics/">pics</a></td><td title="12/03/2017" class="RESvisited">5 days ago</td><td class="RESshortcut" data-subreddit="pics">+shortcut</td></tr><tr><td><a href="/r/worldnews/">worldnews</a></td><td class="RESvisited">Never</td><td class="RESshortcut" data-subreddit="worldnews">+shortcut</td></tr></tbody>`;
    document.getElementById('srDropdownContainer').onclick = function() {
        document.getElementById('srList').innerHTML = RESSubscriptionsDIV;
    }
}

function setUpDomForVanillaReddit() {
    const vanillaSubscriptionsDIV =
        `<div class="sr-list">
            <ul class="flat-list sr-bar hover"><li class="selected"><a href="https://www.reddit.com/" class="choice">home</a></li><li><span class="separator">-</span><a href="https://www.reddit.com/r/popular/" class="choice">popular</a></li><li><span class="separator">-</span><a href="https://www.reddit.com/r/all/" class="choice">all</a></li><li><span class="separator">-</span><a href="https://www.reddit.com/r/random/" class="random choice">random</a></li><li><span class="separator">-</span><a href="https://www.reddit.com/users/" class="choice">users</a></li></ul><span class="separator">&nbsp;|&nbsp;</span><ul class="flat-list sr-bar hover"><li><a href="https://www.reddit.com/r/AskReddit/" class="choice">AskReddit</a></li><li><span class="separator">-</span><a href="https://www.reddit.com/r/worldnews/" class="choice">worldnews</a></li><li><span class="separator">-</span><a href="https://www.reddit.com/r/pics/" class="choice">pics</a></li><li><span class="separator">-</span><a href="https://www.reddit.com/r/gaming/" class="choice">gaming</a></li><li><span class="separator">-</span><a href="https://www.reddit.com/r/aww/" class="choice">aww</a></li><li><span class="separator">-</span><a href="https://www.reddit.com/r/cars/" class="choice">cars</a></li><li><span class="separator">-</span><a href="https://www.reddit.com/r/food/" class="choice">food</a></li><li><span class="separator">-</span><a href="https://www.reddit.com/r/Art/" class="choice">Art</a></li><li><span class="separator">-</span><a href="https://www.reddit.com/r/gadgets/" class="choice">gadgets</a></li></ul><span class="separator">&nbsp;|&nbsp;</span><ul class="flat-list sr-bar hover" id="sr-bar"><li><a href="https://www.reddit.com/r/videos/" class="choice">videos</a></li><li><span class="separator">-</span><a href="https://www.reddit.com/r/funny/" class="choice">funny</a></li><li><span class="separator">-</span><a href="https://www.reddit.com/r/todayilearned/" class="choice">todayilearned</a></li><li><span class="separator">-</span><a href="https://www.reddit.com/r/movies/" class="choice">movies</a></li><li><span class="separator">-</span><a href="https://www.reddit.com/r/news/" class="choice">news</a></li><li><span class="separator">-</span><a href="https://www.reddit.com/r/gifs/" class="choice">gifs</a></li><li><span class="separator">-</span><a href="https://www.reddit.com/r/mildlyinteresting/" class="choice">mildlyinteresting</a></li><li><span class="separator">-</span><a href="https://www.reddit.com/r/Showerthoughts/" class="choice">Showerthoughts</a></li><li><span class="separator">-</span><a href="https://www.reddit.com/r/television/" class="choice">television</a></li><li><span class="separator">-</span><a href="https://www.reddit.com/r/Jokes/" class="choice">Jokes</a></li><li><span class="separator">-</span><a href="https://www.reddit.com/r/science/" class="choice">science</a></li><li><span class="separator">-</span><a href="https://www.reddit.com/r/OldSchoolCool/" class="choice">OldSchoolCool</a></li><li><span class="separator">-</span><a href="https://www.reddit.com/r/sports/" class="choice">sports</a></li><li><span class="separator">-</span><a href="https://www.reddit.com/r/IAmA/" class="choice">IAmA</a></li><li><span class="separator">-</span><a href="https://www.reddit.com/r/Documentaries/" class="choice">Documentaries</a></li><li><span class="separator">-</span><a href="https://www.reddit.com/r/TwoXChromosomes/" class="choice">TwoXChromosomes</a></li><li><span class="separator">-</span><a href="https://www.reddit.com/r/explainlikeimfive/" class="choice">explainlikeimfive</a></li><li><span class="separator">-</span><a href="https://www.reddit.com/r/personalfinance/" class="choice">personalfinance</a></li><li><span class="separator">-</span><a href="https://www.reddit.com/r/books/" class="choice">books</a></li><li><span class="separator">-</span><a href="https://www.reddit.com/r/tifu/" class="choice">tifu</a></li><li><span class="separator">-</span><a href="https://www.reddit.com/r/Futurology/" class="choice">Futurology</a></li><li><span class="separator">-</span><a href="https://www.reddit.com/r/dataisbeautiful/" class="choice">dataisbeautiful</a></li><li><span class="separator">-</span><a href="https://www.reddit.com/r/WritingPrompts/" class="choice">WritingPrompts</a></li><li><span class="separator">-</span><a href="https://www.reddit.com/r/nottheonion/" class="choice">nottheonion</a></li><li><span class="separator">-</span><a href="https://www.reddit.com/r/Music/" class="choice">Music</a></li><li><span class="separator">-</span><a href="https://www.reddit.com/r/photoshopbattles/" class="choice">photoshopbattles</a></li><li><span class="separator">-</span><a href="https://www.reddit.com/r/EarthPorn/" class="choice">EarthPorn</a></li><li><span class="separator">-</span><a href="https://www.reddit.com/r/philosophy/" class="choice">philosophy</a></li><li><span class="separator">-</span><a href="https://www.reddit.com/r/nosleep/" class="choice">nosleep</a></li><li><span class="separator">-</span><a href="https://www.reddit.com/r/GetMotivated/" class="choice">GetMotivated</a></li><li><span class="separator">-</span><a href="https://www.reddit.com/r/askscience/" class="choice">askscience</a></li><li><span class="separator">-</span><a href="https://www.reddit.com/r/LifeProTips/" class="choice">LifeProTips</a></li><li><span class="separator">-</span><a href="https://www.reddit.com/r/space/" class="choice">space</a></li><li><span class="separator">-</span><a href="https://www.reddit.com/r/UpliftingNews/" class="choice">UpliftingNews</a></li><li><span class="separator">-</span><a href="https://www.reddit.com/r/DIY/" class="choice">DIY</a></li><li><span class="separator">-</span><a href="https://www.reddit.com/r/history/" class="choice">history</a></li><li><span class="separator">-</span><a href="https://www.reddit.com/r/creepy/" class="choice">creepy</a></li><li><span class="separator">-</span><a href="https://www.reddit.com/r/listentothis/" class="choice">listentothis</a></li><li><span class="separator">-</span><a href="https://www.reddit.com/r/blog/" class="choice">blog</a></li><li><span class="separator">-</span><a href="https://www.reddit.com/r/announcements/" class="choice">announcements</a></li><li><span class="separator">-</span><a href="https://www.reddit.com/r/InternetIsBeautiful/" class="choice">InternetIsBeautiful</a></li></ul>
        </div>`;
    document.querySelector('head').innerHTML = vanillaSubscriptionsDIV;
}

module.exports = {
    uuid: function(name) {
        return name + '-' + s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
    },
    setUpDomForRES: setUpDomForRES,
    setUpDomForVanillaReddit: setUpDomForVanillaReddit,
    expectedSubscriptions: ["/r/art/", "/r/askreddit/", "/r/aww/", "/r/cars/", "/r/food/", "/r/gadgets/", "/r/gaming/", "/r/pics/", "/r/worldnews/"]
}
