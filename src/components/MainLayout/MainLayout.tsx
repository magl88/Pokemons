import { memo, useLayoutEffect } from "react";
import styles from "./MainLayout.module.scss";
import { Outlet } from "react-router-dom";
import SearchPokemon from "@/components/SearchPokemon/SearchPokemon";
import { Layout, Image } from "antd";
import { Link } from "react-router-dom";
import gsap, { Power2 } from "gsap";
import { TEXT_DATA } from "@/utils/constants";
const { Header, Content, Footer } = Layout;

export const MainLayout = memo(() => {
	useLayoutEffect(() => {
		const logoJump = gsap.timeline({ defaults: { duration: 1, repeat: -1, repeatDelay: 1 } });
		logoJump
			.to(".logo", {
				y: -10,
				ease: Power2.easeOut,
				rotation: 30,
			})
			.to(".logo", {
				y: 0,
				rotation: 0,
				ease: Power2.easeInOut,
			});

		return () => {
			logoJump.remove;
		};
	}, []);

	return (
		<Layout className={styles.layout}>
			<Header className={styles.header}>
				<Link to={"/"}>
					<Image
						className={"logo"}
						preview={false}
						alt={TEXT_DATA.logo}
						width={100}
						src="/logo.png"
					/>
				</Link>
				<SearchPokemon className={styles.search} />
			</Header>
			<Content className={styles.content}>
				<Outlet />
			</Content>
			<Footer className={styles.footer}>
				Pokemon Design ©{new Date().getFullYear()} Created by Pokemon
			</Footer>
		</Layout>
	);
});
