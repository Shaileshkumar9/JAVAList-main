document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("itemForm");
    const itemsContainer = document.getElementById("itemsContainer");

    // ✅ Handle form submission (Add Item)
    if (form) {
        form.addEventListener("submit", function (event) {
            event.preventDefault(); // Prevent page refresh

            const name = document.getElementById("name").value;
            const price = parseFloat(document.getElementById("price").value);

            fetch("http://localhost:9090/items", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, price })
            })
            .then(response => response.json())
            .then(data => {
                alert("Item added successfully: " + JSON.stringify(data));
                form.reset(); // Clear form
            })
            .catch(error => alert("Error: " + error));
        });
    }

    // ✅ Fetch and display all items (on items.html)
    if (itemsContainer) {
        fetch("http://localhost:9090/items")
            .then(response => response.json())
            .then(data => {
                itemsContainer.innerHTML = ""; // Clear previous content
                if (data.length === 0) {
                    itemsContainer.innerHTML = "<p>No items found.</p>";
                    return;
                }

                data.forEach(item => {
                    const itemCard = document.createElement("div");
                    itemCard.classList.add("item-card");
                    itemCard.innerHTML = `<h3>${item.name}</h3><p>Price: $${item.price}</p>`;
                    itemsContainer.appendChild(itemCard);
                });
            })
            .catch(error => {
                itemsContainer.innerHTML = "<p>Error loading items.</p>";
                console.error("Error:", error);
            });
    }
});
