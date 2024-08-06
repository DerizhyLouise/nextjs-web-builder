import { useState } from "react";

const Home = () => {
	const [name, setName] = useState("");
	const [isValid, setIsValid] = useState(true);

	const handleSubmit = () => {
		if (!name) {
			setIsValid(false);
			return;
		}
	};

	const [pages, setpages] = useState([]);

	return (
		<div className="bg-primary text-white h-screen pt-20 xl:pt-40 pb-20 2xl:px-60 xl:px-40 px-20">
			<form id="create-page" noValidate>
				<div className="text-4xl border-b-2 border-white pb-4 font-semibold px-4">
					Create Page
				</div>
				<div className="border-b-2 border-white pb-4 px-4">
					<div className="flex flex-col gap-2 mt-2">
						<label htmlFor="name" className="text-lg">
							Name
						</label>
						<input
							type="text"
							className={`outline-none rounded-sm text-primary p-2 uppercase ${
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
				<div className="border-b-2 border-white p-4 flex justify-end">
					<button
						type="button"
						onClick={handleSubmit}
						className="p-2 border-2 border-white w-20 hover:text-primary hover:bg-white duration-300"
					>
						Save
					</button>
				</div>
			</form>
			<div className="p-4">
				<table className="w-full">
					<thead>
						<tr className="grid grid-cols-10 text-center">
							<td className="col-span-2 border py-2 border-white">
								ID
							</td>
							<td className="col-span-4 border py-2 border-white">
								Name
							</td>
							<td className="col-span-2 border py-2 border-white">
								Slug
							</td>
							<td className="col-span-2 border py-2 border-white">
								Action
							</td>
						</tr>
					</thead>
					<tbody>
						{pages
							? pages.map((page) => {
									<tr>
										<td className="col-span-2 border py-2 border-white">
											{page._id}
										</td>
										<td className="col-span-2 border py-2 border-white">
											{page.name}
										</td>
										<td className="col-span-2 border py-2 border-white">
											{page.slug}
										</td>
										<td className="col-span-2 border py-2 border-white">
											<a href={`/editor/${this._id}`}>
												Edit
											</a>
										</td>
									</tr>;
							  })
							: "No Page"}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default Home;
