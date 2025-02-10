export function PostTag({ tag, key }: { tag: string; key?: any }) {
    return (
        <div
            key={key}
            className="tag bg-[#D8E9EA] h-fit py-1 whitespace-pre-wrap w-max font-secondaryMedium text-subheading4 lg:px-4 px-3 uppercase"
        >
            {tag}
        </div>
    )
}
