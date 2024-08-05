import useSWR from "swr";
import Footer from "./footer";
import Navbar from "./navbar";

export default function Layout({ children }) {
	const { data, error } = useSWR("/api/navigation", fetcher);

	if (error) return <div>Failed to load</div>;
	if (!data) return <div>Loading...</div>;

	return (
		<>
			<Navbar links={data.links} />
			<main>{children}</main>
			<Footer />
		</>
	);
}
