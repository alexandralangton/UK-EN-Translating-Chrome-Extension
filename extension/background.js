const getCurrentTab = async () => {
	let queryOptions = { active: true, currentWindow: true };
	let [tab] = await chrome.tabs.query(queryOptions);
	return tab.id;
};

chrome.action.onClicked.addListener(async () => {
	const tabId = await getCurrentTab();
	chrome.scripting.executeScript({
		target: { tabId },
		files: ['scripts/compromise.min.js'],
	});
	chrome.scripting.executeScript({
		target: { tabId },
		files: ['scripts/compromise.min.numbers.js'],
	});
	chrome.scripting.executeScript({
		target: { tabId },
		files: ['scripts/compromise.min.dates.js'],
	});
	chrome.scripting.executeScript({
		target: { tabId },
		files: ['main.js'],
	});
});
