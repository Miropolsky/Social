import NavBar from './NavBar';

export default function NavBarContainer({ store }) {
    const state = store.getState();
    return <NavBar frinedsData={state.siteBar.friends} />;
}
