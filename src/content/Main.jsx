import { useSelector } from 'react-redux'
import MenuBar from '../components/MenuBar'

export default function Main() {
	const isMenuOpen = useSelector((state) => state.menu.isMenuOpen)

	return (
		<div className='w-full h-full flex'>
			<div
				className={
					isMenuOpen ? 'w-5/6 h-full flex' : 'w-full h-full flex justify-center'
				}
			>
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Non quod vel
				inventore, praesentium perferendis expedita in molestias dicta culpa hic
				illum vero. Consectetur pariatur laborum, necessitatibus iure aut
				aspernatur quam. Lorem ipsum dolor sit, amet consectetur adipisicing
				elit. Eveniet accusantium, reprehenderit veniam nulla ratione cupiditate
				perferendis inventore minus delectus vero omnis ut ipsum reiciendis.
				Laborum quasi inventore possimus illum officia.
			</div>
			<MenuBar isMenuOpen={isMenuOpen} />
		</div>
	)
}
