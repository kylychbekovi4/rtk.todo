import { FC } from "react";
import scss from "./Layout.module.scss";
import useScript_V2 from "../ui/cursorUi";
import TodoList from "../pages/TodoList";

interface LayoutProps {
	// eslint-disable-next-line
	url?: any;
}

const Layout: FC<LayoutProps> = ({ url }) => {
	useScript_V2(url);

	return (
		<>
			<canvas className={scss.canvas} id="canvas" />
			<div className={scss.Layout}>
				<main>
					<TodoList />
				</main>
			</div>
		</>
	);
};

export default Layout;
