import { Separator } from '@/components/ui/separator';
import { Metadata } from 'next';
import Image from 'next/image';

export const metadata: Metadata = {
    title: 'Về Crodic Crystal',
};

export default function Page() {
    return (
        <div className="wrapper">
            <h3 className="text-center font-bold text-primary text-4xl">Về Crodic Crystal</h3>
            <Separator className="my-4" />
            <section className="space-y-4">
                <h2 className="text-2xl font-semibold">👋 Xin chào!</h2>
                <p>
                    Mình là <strong className="text-primary">Crodic Crystal</strong>, một người đam mê anime, game và
                    lập trình front-end. Blog này là nơi mình chia sẻ trải nghiệm, đánh giá và kiến thức xoay quanh ba
                    chủ đề mình yêu thích nhất.
                </p>

                <h3 className="text-2xl font-semibold">🎌 Anime</h3>
                <p>
                    Mình theo dõi anime từ lâu và có niềm đam mê đặc biệt với những câu chuyện sâu sắc, hình ảnh đẹp mắt
                    và nhân vật ấn tượng. Trên blog này, mình sẽ chia sẻ cảm nhận về các bộ anime mới, đánh giá về cốt
                    truyện, đồ họa, âm nhạc và thông điệp mà mỗi bộ phim mang lại. Ngoài ra, mình cũng sẽ viết về những
                    xu hướng anime đang hot, các bộ đáng mong đợi và cả những tác phẩm kinh điển không thể bỏ qua.
                </p>

                <Image
                    src={'/anime-background.png'}
                    alt="anime"
                    width={2994}
                    height={1632}
                    priority
                    className="w-full h-auto object-cover"
                />

                <h3 className="text-2xl font-semibold">🎮 Game</h3>
                <p>
                    Là một game thủ chính hiệu, mình luôn hứng thú với những tựa game có gameplay cuốn hút, cốt truyện
                    hấp dẫn và đồ họa mãn nhãn. Trên blog này, mình sẽ viết về các tựa game hot trên nhiều nền tảng như
                    PC, console và mobile. Bạn sẽ tìm thấy ở đây những bài đánh giá game, tin tức cập nhật về ngành công
                    nghiệp game, cũng như những bài hướng dẫn, mẹo chơi và phân tích sâu về gameplay.
                </p>

                <h3 className="text-2xl font-semibold">💻 Front-end Development</h3>
                <p>
                    Lập trình web, đặc biệt là front-end, là một niềm đam mê khác của mình. Blog này sẽ có những bài
                    viết hướng dẫn về các công nghệ như <strong>HTML, CSS, JavaScript</strong>, cùng những framework phổ
                    biến như
                    <strong>Vue.js, React, và Next.js</strong>. Ngoài ra, mình cũng chia sẻ kinh nghiệm thực tế về
                    UI/UX, tối ưu hiệu suất trang web và cập nhật những xu hướng mới trong lĩnh vực phát triển web.
                </p>

                <Image
                    src={'/fe.jpg'}
                    alt="front-end"
                    width={1192}
                    height={668}
                    className="w-full h-auto object-cover"
                />

                <p className="italic text-muted-foreground">
                    🔥 Nếu bạn cũng yêu thích anime, game và lập trình front-end, hãy cùng nhau khám phá, trao đổi và
                    xây dựng một cộng đồng đam mê nhé!
                </p>
            </section>
        </div>
    );
}
