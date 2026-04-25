function getElement(id) {
    return document.getElementById(id);
}

function hideElement(id) {
    const element = getElement(id);

    if (element) {
        element.classList.add("hidden");
    }
}

function showElement(id) {
    const element = getElement(id);

    if (element) {
        element.classList.remove("hidden");
    }
}

function getJobCard(id) {
    return getElement(`job-card-${id}`);
}

function getJobBadge(id) {
    return getElement(`job-badge-${id}`);
}

function getInterviewButton(id) {
    return getElement(`interview-action-${id}`);
}

function getRejectedButton(id) {
    return getElement(`rejected-action-${id}`);
}

function getJobStatus(id) {
    const badge = getJobBadge(id);

    if (!badge) {
        return "";
    }

    return badge.innerText.toLowerCase();
}

function setBadgeStyle(id, status) {
    const badge = getJobBadge(id);
    const interviewButton = getInterviewButton(id);
    const rejectedButton = getRejectedButton(id);

    if (!badge || !interviewButton || !rejectedButton) {
        return;
    }

    badge.className = "job-badge badge uppercase font-bold py-4 px-3";

    interviewButton.className = "interview-action btn btn-outline btn-success btn-sm uppercase";
    rejectedButton.className = "rejected-action btn btn-outline btn-error btn-sm uppercase";

    if (status === "interview") {
        badge.classList.add("badge-soft", "badge-success");
        badge.innerText = "Interview";
        interviewButton.className = "interview-action btn btn-success btn-sm uppercase text-white";
        return;
    }

    if (status === "rejected") {
        badge.classList.add("badge-soft", "badge-error");
        badge.innerText = "Rejected";
        rejectedButton.className = "rejected-action btn btn-error btn-sm uppercase text-white";
        return;
    }

    badge.className = "job-badge badge bg-[#e8f0fb] text-[#123d74] border-none uppercase font-bold py-4 px-3";
    badge.innerText = "Not Applied";
}

function countAllJobs() {
    let count = 0;

    for (let i = 1; i <= 8; i++) {
        const card = getJobCard(i);

        if (card) {
            count++;
        }
    }

    return count;
}

function countInterviewJobs() {
    let count = 0;

    for (let i = 1; i <= 8; i++) {
        if (getJobStatus(i) === "interview") {
            count++;
        }
    }

    return count;
}

function countRejectedJobs() {
    let count = 0;

    for (let i = 1; i <= 8; i++) {
        if (getJobStatus(i) === "rejected") {
            count++;
        }
    }

    return count;
}

function updateDashboard() {
    getElement("total-count").innerText = countAllJobs();
    getElement("interview-count").innerText = countInterviewJobs();
    getElement("rejected-count").innerText = countRejectedJobs();
}
