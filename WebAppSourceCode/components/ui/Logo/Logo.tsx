import Image from 'next/image'

const Logo = ({ className = '', ...props }) => (
  <Image src='/logo.svg' height={60} width={60} alt='Logo'/>
)

export default Logo
