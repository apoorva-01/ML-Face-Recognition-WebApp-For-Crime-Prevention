import { FC,useContext } from 'react'
import Link from 'next/link'
import s from './Navbar.module.css'
import NavbarRoot from './NavbarRoot'
import { Logo, Container } from '@components/ui'
import { Searchbar, UserNav } from '@components/common'
import { I18nWidget } from '@components/common'
import { DataStore } from "../../../utils/DataStore";
import MailIcon from '@mui/icons-material/Mail';
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';
import PhoneIcon from '@mui/icons-material/Phone';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
interface Link {
  href: string
  label: string
}

interface NavbarProps {
  links?: Link[]
}

const Navbar: FC<NavbarProps> = ({ links }) => {
  const { state} = useContext(DataStore);
  const {storeInfo}=state;
  return(
  <NavbarRoot>
    <Container>
      <div className={s.nav}>
        <div className="flex items-center flex-3">
          <nav className={s.navMenu}>
            {storeInfo?(
             <>
          {storeInfo.address.city?(
                <a href={`/`} className={s.link}><AddLocationAltIcon/> &nbsp;{storeInfo.address.city}</a>
             ):null}
             {storeInfo.phone?(
                <a href={`tel:${storeInfo.phone}`} className={s.link}><PhoneIcon/> &nbsp;{storeInfo.phone}</a>
             ):null}
             {storeInfo.gst?(
                <a  className={s.link}><CheckCircleOutlineIcon/>GST No. &nbsp;{storeInfo.gst}</a>
             ):null}
        
                     {storeInfo.email?(
                <a href={`mailto:${storeInfo.email}`} className={s.link}><MailIcon/> &nbsp;{storeInfo.email}</a>
             ):null}
             </>
            ):null}
           
          </nav>
        </div>
     
        <div className="flex items-center justify-end flex-1 space-x-8">
        {/* <I18nWidget /> */}
        </div>
      </div>


      <div className={s.nav}>
        <div className="flex items-center flex-1">
          <Link href="/">
            <a  aria-label="Logo">
              <Logo />
            </a>
          </Link>
          <nav className={s.navMenu}>
            <Link href="/search">
              <a className={s.link}>All</a>
            </Link>
            {links?.map((l) => (
              <Link href={l.href} key={l.href}>
                <a className={s.link}>{l.label}</a>
              </Link>
            ))}
          </nav>
        </div>
        {process.env.COMMERCE_SEARCH_ENABLED && (
          <div className="justify-center flex-1 hidden lg:flex">
            <Searchbar />
          </div>
        )}
        <div className="flex items-center justify-end flex-1 space-x-8">
          <UserNav />
        </div>
      </div>
      {process.env.COMMERCE_SEARCH_ENABLED && (
        <div className="flex pb-4 lg:px-6 lg:hidden">
          <Searchbar id="mobile-search" />
        </div>
      )}
    </Container>
  </NavbarRoot>

)}

export default Navbar
