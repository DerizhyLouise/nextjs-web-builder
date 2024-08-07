import { useEffect, useState } from "react";
import RingLoader from "react-spinners/RingLoader";

type Page = { id: string; name: string; slug: string };

const Home = () => {
	const [name, setName] = useState("");
	const [isValid, setIsValid] = useState(true);
	const [pages, setPages] = useState([]);
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);

	const getAllPages = async () => {
		try {
			setLoading(true);
			const response = await fetch(`./api/getAllPages`);
			setPages(await response.json());
		} catch (error) {
			console.log("Error: ", error);
			setError(error.message);
		} finally {
			setLoading(false);
		}
	};

	const handleSubmit = async () => {
		if (!name) {
			setIsValid(false);
		} else {
			try {
				setLoading(true);
				const response = await fetch(`./api/createPage`, {
					method: "POST",
					body: JSON.stringify({
						name: name,
					}),
				});
				const newPage: Page = (await response.json()).data;
				setName("");
				setPages([...pages, newPage]);
			} catch (error) {
				console.log("Error: ", error);
				setError(error.message);
			} finally {
				setLoading(false);
			}
		}
	};

	const handleDelete = async (id: string) => {
		try {
			setLoading(true);
			const response = await fetch(`./api/deletePage`, {
				method: "DELETE",
				body: JSON.stringify({ id }),
			});
			await response.json();
			setName("");
			getAllPages();
		} catch (error) {
			console.log("Error: ", error);
			setError(error.message);
		}
	};

	useEffect(() => {
		getAllPages();
	}, []);

	return (
		<div className="bg-primary text-white h-screen pt-20 xl:pt-40 pb-20 2xl:px-60 xl:px-40 px-20">
			{loading && (
				<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
					<RingLoader
						color={"#F45E43"}
						loading={loading}
						cssOverride={{ borderColor: "#F45E43" }}
						size={150}
						aria-label="Loading Spinner"
						data-testid="loader"
					/>
				</div>
			)}
			<form id="create-page" noValidate>
				<div className="text-4xl border-b-2 border-secondary pb-4 font-semibold px-4">
					Create Page
				</div>
				<div className="border-b-2 border-secondary pb-4 px-4">
					<div className="flex flex-col gap-2 mt-2">
						<label htmlFor="name" className="text-lg">
							Name
						</label>
						<input
							type="text"
							className={`outline-none rounded-sm text-primary p-2 capitalize ${
								isValid ? "" : "outline-2 outline-red-500"
							}`}
							id="name"
							placeholder="Name of Page"
							value={name}
							onChange={(e) => {
								setName(e.target.value);
							}}
							required
						/>
						{!isValid && (
							<div className="text-red-500">
								Please Provide a Valid Name
							</div>
						)}
					</div>
				</div>
				<div className="border-b-2 border-secondary p-4 flex justify-end">
					<button
						type="button"
						onClick={handleSubmit}
						className="p-2 border-2 border-secondary w-20 hover:text-primary hover:bg-secondary duration-300 font-semibold"
					>
						Save
					</button>
				</div>
			</form>
			<div className="p-4">
				{error && <div className="text-red-500">{error}</div>}
				<table className="w-full">
					<thead>
						<tr className="grid grid-cols-10 text-center">
							<td className="col-span-2 border py-2 px-4 border-secondary">
								ID
							</td>
							<td className="col-span-4 border py-2 px-4 border-secondary">
								Name
							</td>
							<td className="col-span-2 border py-2 px-4 border-secondary">
								Slug
							</td>
							<td className="col-span-2 border py-2 px-4 border-secondary">
								Action
							</td>
						</tr>
					</thead>
					<tbody>
						{pages
							? pages.map((page) => (
									<tr
										key={page._id}
										className="grid grid-cols-10"
									>
										<td className="col-span-2 border py-2 px-4 border-secondary">
											{page._id}
										</td>
										<td className="col-span-4 border py-2 px-4 border-secondary">
											{page.name}
										</td>
										<td className="col-span-2 border py-2 px-4 border-secondary">
											{page.slug}
										</td>
										<td className="col-span-2 border py-2 px-4 border-secondary underline flex justify-center gap-4">
											<a href={`/editor/${page._id}`}>
												Edit
											</a>
											<button
												className="underline"
												onClick={() =>
													handleDelete(page._id)
												}
											>
												Delete
											</button>
										</td>
									</tr>
							  ))
							: "No Page"}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default Home;
