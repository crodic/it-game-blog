import BlogCard from '@/components/blog-card';
import SearchBar from '@/components/search-bar';
import SideBlogs from '@/components/side-blogs';
import { Separator } from '@/components/ui/separator';

export default function BlogDetail({ params }: { params: { blogId: string } }) {
    return (
        <div className="wrapper space-y-12">
            <div className="content flex gap-8">
                <div className="flex-1 space-y-4">
                    <p className="text-sm text-primary opacity-45">{new Date().toDateString()}</p>
                    <h3 className="text-4xl font-bold">{params.blogId}</h3>
                    <main
                        className="h-max"
                        dangerouslySetInnerHTML={{
                            __html: `<div class="content-editor">
  <h1 class="editor-title">Amazing Figures from Japan</h1>
  
  <p class="editor-paragraph">
    Japanese figure models are known for their incredible detail and craftsmanship. Whether you're a fan of anime, manga, or gaming, there's a figure for everyone.
  </p>
  
  <img
    src="https://scontent.fsgn13-2.fna.fbcdn.net/v/t39.30808-6/474148771_1031210462373145_727963147257711756_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeE2KVzugVO1bZCX12uQlc8VD6lJjRMxTGIPqUmNEzFMYlwi2cXhqbJdBHebaW9OiJZ7KZylJxnLGKt6ECc1KphX&_nc_ohc=j3Qhfb2n4RsQ7kNvgGnBA71&_nc_oc=Adg5A3w-AXGCbn3fo1z6dA25QHYPavbqBeztRkITe0CrK9nvOfg0t8qvfeshbs2U6vM&_nc_zt=23&_nc_ht=scontent.fsgn13-2.fna&_nc_gid=AJ_cJRcEkWTV7lNev5zac3d&oh=00_AYCo1anaWabKSKGVUT28hU7OdcT1AT3SyS3dT5BXC3Im7w&oe=679902DF"
    alt="Japanese figure model"
    class="editor-image"
    style="max-width: 100%; height: auto; margin: 10px 0;"
  />
  
  <p class="editor-paragraph">
    Check out our collection to find your favorite characters and add them to your collection today!
  </p>
</div>
`,
                        }}
                    ></main>
                </div>
                <div className="hidden lg:block space-y-16">
                    <div className="space-y-4">
                        <div>
                            <h6 className="text-base font-semibold">Tìm kiếm bài viết</h6>
                            <Separator className="border-2 border-primary" />
                        </div>
                        <SearchBar />
                    </div>
                    <SideBlogs />
                </div>
            </div>

            <div className="space-y-4">
                <div className="w-max">
                    <h4 className="text-xl font-semibold">Bài viết liên quan</h4>{' '}
                    <Separator className="border-2 border-primary" />
                </div>
                <nav>
                    <ul className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        {[1, 2, 3, 4].map((item) => (
                            <BlogCard key={item} showDesc />
                        ))}
                    </ul>
                </nav>
            </div>
        </div>
    );
}
