import IconRightArrow from '@/components/icons/IconRightArrow'
import Link from 'next/link'
export default function NotFound() {
    return (
        <div className="content-grid mt-[60px]">
            <div className="grid place-items-center py-20 lg:py-0">
                <div className="flex flex-col gap-[60px] lg:gap-20 items-center justify-center">
                    <h1 className="text-center lg:text-h1 text-h4">
                        404 - Page Not Found
                    </h1>
                    <p className="max-w-[618px] lg:text-copy2 text-copy4 text-center">
                        {
                            "The page you were looking for doesn't exist. You may have entered the wrong address or it may have moved."
                        }
                    </p>
                    <Link
                        className="flex gap-2 text-subheading3 lg:text-subheading2 font-medium uppercase items-center"
                        href="/"
                    >
                        <span>Return Home</span>
                        <IconRightArrow width="17" height="12" />
                    </Link>
                </div>
            </div>
        </div>
    )
}
