async function getCurrentTab() {
	let queryOptions = { active: true, currentWindow: true };
	let [tab] = await chrome.tabs.query(queryOptions);
	return tab.id;
}

chrome.action.onClicked.addListener(async () => {
	const tabId = await getCurrentTab();
	console.log(tabId);
	console.log('i registered a click');
	chrome.scripting.executeScript({
		target: { tabId },
		files: ['main.js'],
	});
});
