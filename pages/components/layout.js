import Image from 'next/image'

export default function Layout({ children }) {
    return (
        <>
            <div className='header'>
                <Image className='logoImage' src='/pokemon-logo.webp' width={350} height={150} alt='Logo project' />
            </div>
            <main>{children}</main>
        </>
    )
}