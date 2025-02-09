document.addEventListener("DOMContentLoaded", () => {
    const roles = ["Web Developer", "Btech Student", "VIT Bhopal"];
    const roleElement = document.getElementById('role');
    let roleIndex = 0;
    let letterIndex = 0;
    let typingInterval;

    function typeRole() {
        roleElement.style.opacity = 0;
        setTimeout(() => {
            roleElement.textContent = "";
            letterIndex = 0;

            typingInterval = setInterval(() => {
                if (letterIndex < roles[roleIndex].length) {
                    roleElement.textContent += roles[roleIndex].charAt(letterIndex);
                    letterIndex++;
                } else {
                    clearInterval(typingInterval);
                    setTimeout(() => {
                        roleIndex = (roleIndex + 1) % roles.length;
                        typeRole();  // Add this line to restart the typing effect for the next role
                    }, 1000);
                }
            }, 150);

            roleElement.style.opacity = 1;
        }, 500);
    }

    typeRole();
});


async function fetchGitHubContributions(username) {
    const response = await fetch(`https://api.github.com/users/Vishalk1604`);
    const data = await response.json();
    if (data.public_repos !== undefined) {
        document.getElementById('contribution-count').textContent = data.public_repos; // Example: Using public repos as contribution count
    } else {
        document.getElementById('contribution-count').textContent = "N/A";
    }
}

fetchGitHubContributions('Vishalk1604');




async function fetchLeetCodeData(username) {
    try {
        const response = await fetch(`https://leetcode-stats-api.herokuapp.com/${username}`);
        const data = await response.json();

        // Check if the response contains a streak value
        if (data && data.streak !== undefined) {
            document.getElementById("leet-code-count").textContent = data.streak;
        } else {
            document.getElementById("leet-code-count").textContent = "N/A";
        }
    } catch (error) {
        console.error("Error fetching LeetCode data:", error);
        document.getElementById("leet-code-count").textContent = "Error";
    }
}

// Fetch LeetCode streak for the specified username
fetchLeetCodeData("vishalkarun0205");
