const config = require('../config/configuration.json');

function saveBlacklist(subreddit, callback) {
    chrome.storage.sync.get([
        'RREBlackList',
        'RRERecommendations'
    ], function(items) {
        var doDelete = true;
        var blacklist = items.RREBlackList;
        var recommendations = items.RRERecommendations;
        var i;
        for (i = 0; i < blacklist.length; i++) {
            if (blacklist[i].subreddit === subreddit) {
                // If this is true then we are deleting the entry, not adding it
                if (blacklist[i].rank !== -1) {
                    recommendations.splice(blacklist[i].rank, 0, blacklist[i]);
                }
                blacklist.splice(i, 1);
                doDelete = false;
                break;
            }
        }

        if (doDelete) {
            var newBlacklistEntry = {
                subreddit: subreddit,
                rank: -1
            }

            var recommendations = items.RRERecommendations;
            for (i = 0; i < recommendations.length; i++) {
                if (recommendations[i].subreddit === newBlacklistEntry.subreddit) {
                    newBlacklistEntry.rank = i;
                    break;
                }
            }
            if (newBlacklistEntry.rank > -1) {
                recommendations.splice(newBlacklistEntry.rank, 1);
            }

            blacklist.push(newBlacklistEntry);
        }

        chrome.storage.sync.set({
            RREBlackList: blacklist,
            RRERecommendations: recommendations
        }, function() {
            callback();
        });
    });
}

function createListEntry(parentID, value, displayStatus, deleteCallback) {
    var parentDIV = document.getElementById(parentID);

    for (var i = 0; i < parentDIV.childElementCount; i++) {
        var existingValue = parentDIV.children[i].children[0].innerHTML;
        if (existingValue === value) {
            if (displayStatus) {
                var status = document.getElementById(parentID + "-status");
                status.textContent = 'Entry already exists';
                setTimeout(function() {
                    status.textContent = '';
                }, 1000);
            }
            return false;
        }
    }

    var id = parentID + "-" + value;

    var entry = document.createElement("div");
    entry.setAttribute("id", id);
    entry.style.display = "block";

    var valueDIV = document.createElement("div");
    valueDIV.innerHTML = value;
    valueDIV.style.display = "inline";
    entry.appendChild(valueDIV);

    if (parentID === "recommendations") {
        entry.setAttribute("class", "recommendation");
        valueDIV.addEventListener('click', function() {
            window.location.pathname = value;
        });
    }

    var deleteButton = document.createElement("button");
    deleteButton.setAttribute("class", "deleteButton");
    // deleteButton.setAttribute("id", parentID + "-delete-" + value);
    deleteButton.innerHTML = '&times;';
    deleteButton.addEventListener('click', function() {
        deleteCallback(value);
    });
    entry.appendChild(deleteButton);
    parentDIV.appendChild(entry);
    return true;
}

function setListEntryMessage(parentID, message, image) {
    var existingMessage = getListEntryMessage(parentID);
    if (existingMessage) {
        // delete message if message is undefined or change otherwise
        if (message) {
            existingMessage.firstElementChild.innerHTML = message;
        } else if (image) {
            existingMessage.lastElementChild.src = image;
        } else {
            var parentDIV = document.getElementById(parentID);
            parentDIV.removeChild(existingMessage);
        }
    } else if (message || image) {
        // create and insert
        var parentDIV = document.getElementById(parentID);
        var id = parentID + "-message";

        var entry = document.createElement("div");
        entry.setAttribute("id", id);
        entry.style.display = "block";

        if (message) {
            var valueDIV = document.createElement("div");
            valueDIV.innerHTML = message;
            valueDIV.style.display = "inline";
            entry.appendChild(valueDIV);
        }

        if (image) {
            var imageDIV = document.createElement("img");
            imageDIV.src = image;
            imageDIV.style.display = "inline";
            imageDIV.style.height = "20px";
            entry.appendChild(imageDIV);
        }

        entry.className = "entry-message";

        if (parentID === "recommendations") {
            entry.className += " entry-message-recommendation";
        }

        parentDIV.appendChild(entry);
    }
}

function getListEntryMessage(parentID) {
    var parentDIV = document.getElementById(parentID);
    var id = parentID + "-message";

    for (var i = 0; i < parentDIV.childElementCount; i++) {
        var entryDIV = parentDIV.children[i];
        if (entryDIV.id === id) {
            return entryDIV;
        }
    }
}

function initializeSubscribedSubreddits(calledFromFallback, callback) {
    function srListListener(event) {
        if (event.target.parentElement.id === "srList" && event.target.nodeName === "TBODY") {
            initializeSubscribedSubreddits(true, callback);
        }
    }

    if (calledFromFallback) {
        var srListContainer = document.getElementById("srDropdownContainer");
        if (srListContainer) {
            document.removeEventListener("DOMNodeInserted", srListListener);
            srListContainer.click();
        }
    }
    var subscribedSubreddits = [];
    var srList = document.getElementsByClassName("sr-list");
    var resLayout = false;
    if (srList.length !== 0) {
        // Standard Reddit Layout
        srList = srList[0].lastElementChild;
    } else {
        // RES Layout
        resLayout = true;
        srList = document.getElementById("srList").lastElementChild;
        if (!srList && !calledFromFallback) {
            // Fallback if subreddit table hasn't loaded yet
            var srListContainer = document.getElementById("srDropdownContainer");
            document.addEventListener("DOMNodeInserted", srListListener);
            srListContainer.click();
            return;
        }
    }
    if (srList) {
        for (var i = 0; i < srList.childElementCount; i++) {
            subscribedSubreddits.push(extractSubscribedSubreddit(srList.children[i], resLayout));
        }
    }
    callback(subscribedSubreddits);
}

function extractSubscribedSubreddit(subredditDIV, resLayout) {
    var subredditName;
    if (resLayout) {
        subredditName = subredditDIV.firstElementChild.lastElementChild.innerText;
    } else {
        subredditName = subredditDIV.lastElementChild.innerText;
    }
    subredditName = "/r/" + subredditName + "/";
    return subredditName.toLowerCase();
}

function loadRecommendations(seedData, subscribedSubreddits, showLoadingDIV, callback) {
    var self = this;
    if (!self.loadingNewRecommendations) {
        self.loadingNewRecommendations = true;

        if (showLoadingDIV) {
            // Insert loading animation
            var recommendationsListDIV = document.getElementById('recommendations');
            var loadingDIV = document.createElement("img");
            loadingDIV.setAttribute("src", chrome.runtime.getURL('./img/loading.gif'));
            loadingDIV.setAttribute("id", "recommendations-loading");
            loadingDIV.style.maxHeight = "100px";
            recommendationsListDIV.insertBefore(loadingDIV, recommendationsListDIV.firstElementChild);
        }

        var xhr = new XMLHttpRequest();
        xhr.onload = function() {
            if (this.status === 200) {
                var response = JSON.parse(this.response);
                chrome.storage.sync.set({
                    RRERecommendations: response
                }, function() {
                    self.loadingNewRecommendations = false;
                    if (showLoadingDIV) {
                        // Remove loading animation
                        var recommendationsListDIV = document.getElementById('recommendations');
                        var loadingDIV = document.getElementById("recommendations-loading");
                        recommendationsListDIV.removeChild(loadingDIV);
                    }
                    callback(response);
                });
            } else {
                alert("RRE Server Error: " + this.status);
            }
        };
        xhr.open('POST', config.RREServerURL + '/api/subreddits/recommended');
        xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        xhr.send(JSON.stringify({
            tags: seedData.RRETags,
            subscribed: subscribedSubreddits,
            blacklisted: seedData.RREBlackList,
            maxRecommendations: config.RRERecommendationsCacheSize
        }));
    }
}

function loadTags() {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', config.RREServerURL + '/api/tags/');
    xhr.onload = function() {
        if (this.status === 200) {
            var tagsInput = document.getElementById('tagsInput');
            var response = JSON.parse(this.response);
            var i;
            for (i in response) {
                var option = document.createElement("option");
                option.text = response[i].name;
                tagsInput.add(option);
            }
        }
    };
    xhr.send();
}

function getTagsForSubscriptions(subscribedSubreddits, maxDistance) {
    var xhr = new XMLHttpRequest();
    xhr.open('POST', config.RREServerURL + '/api/subreddits/getTagsForSubreddits');
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.onload = function() {
        var response = JSON.parse(this.response);
        var totalTags = Object.keys(response).length;
        var tagListDIV = document.getElementById('tags');
        // clear list if it has more tags than give (this can be optimized)
        // we dont have to clear list if it has less tags because createListEntry prevents duplicates
        if (tagListDIV.childElementCount > totalTags) {
            while (!!tagListDIV.firstChild) {
                tagListDIV.removeChild(tagListDIV.firstChild);
            }
        }

        function deleteCallback(tag) {
            tagListDIV.removeChild(document.getElementById("tags-" + tag));
        }
        var tag;
        for (tag in response) {
            createListEntry('tags', tag, false, deleteCallback);
        }
    }
    xhr.send(JSON.stringify({
        subreddits: subscribedSubreddits,
        maxDistance: maxDistance
    }));
}

module.exports = {
    saveBlacklist: saveBlacklist,
    createListEntry: createListEntry,
    setListEntryMessage: setListEntryMessage,
    getListEntryMessage: getListEntryMessage,
    initializeSubscribedSubreddits: initializeSubscribedSubreddits,
    xhr: {
        loadingNewRecommendations: false,
        loadRecommendations: loadRecommendations,
        loadTags: loadTags,
        getTagsForSubscriptions: getTagsForSubscriptions
    }
}
