let currentCategory = "all";

function setActiveButton() {
    const allBtn = getElement("all-btn");
    const interviewBtn = getElement("interview-btn");
    const rejectedBtn = getElement("rejected-btn");

    allBtn.className = "btn btn-soft btn-sm rounded-md px-6";
    interviewBtn.className = "btn btn-soft btn-sm rounded-md px-5";
    rejectedBtn.className = "btn btn-soft btn-sm rounded-md px-5";

    if (currentCategory === "all") {
        allBtn.className = "btn btn-primary btn-sm rounded-md px-6";
    }

    if (currentCategory === "interview") {
        interviewBtn.className = "btn btn-primary btn-sm rounded-md px-5";
    }

    if (currentCategory === "rejected") {
        rejectedBtn.className = "btn btn-primary btn-sm rounded-md px-5";
    }
}

function showEmptyMessage() {
    showElement("empty-container");
}

function hideEmptyMessage() {
    hideElement("empty-container");
}

function isMatchedCategory(status) {
    if (currentCategory === "all") {
        return true;
    }

    if (currentCategory === "interview" && status === "interview") {
        return true;
    }

    if (currentCategory === "rejected" && status === "rejected") {
        return true;
    }

    return false;
}

function updateJobCountText() {
    let count = 0;

    for (let i = 1; i <= 8; i++) {
        const card = getJobCard(i);

        if (card && !card.classList.contains("hidden")) {
            count++;
        }
    }

    getElement("job-count-text").innerText = `${count} jobs`;
}

function displayJobs() {
    let visibleJob = 0;

    for (let i = 1; i <= 8; i++) {
        const card = getJobCard(i);

        if (!card) {
            continue;
        }

        const status = getJobStatus(i);

        if (isMatchedCategory(status)) {
            card.classList.remove("hidden");
            visibleJob++;
        }
        else {
            card.classList.add("hidden");
        }
    }

    if (visibleJob === 0) {
        showEmptyMessage();
    } else {
        hideEmptyMessage();
    }
}

function showJobsByCategory(category) {
    currentCategory = category;
    setActiveButton();
    displayJobs();
    updateDashboard();
    updateJobCountText();
}

function setJobStatus(id, status) {
    setBadgeStyle(id, status);
    showJobsByCategory(currentCategory);
}

function deleteJob(id) {
    const card = getJobCard(id);

    if (card) {
        card.remove();
    }

    showJobsByCategory(currentCategory);
}

showJobsByCategory("all");
