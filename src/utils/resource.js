export async function handleCreateSchedule(
	selectedTimezone,
	schedule,
	navigate
) {
	try {
		await fetch("http://localhost:4000/schedule/create", {
			method: "POST",
			body: JSON.stringify({
				userId: localStorage.getItem("_id"),
				timezone: selectedTimezone,
				schedule,
			}),
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
		});
		navigate(`/profile/${localStorage.getItem("_id")}`);
	} catch (err) {
		console.error(err);
	}
}