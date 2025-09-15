import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-home',
  imports: [CommonModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  constructor(public auth: AuthService) {}
// categories = [
//   { name: 'Electronics', img: 'https://tse2.mm.bing.net/th/id/OIP.CbHx8--ypUqshR0R7TylYAAAAA?rs=1&pid=ImgDetMain&o=7&rm=3' },
//   { name: 'Fashion',     img: 'https://marketplace.canva.com/EAFGKRRskMs/1/0/800w/canva-brown-and-beige-minimalist-fashion-banner-B_78un9z_LQ.jpg' },
//   { name: 'Home',        img: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=800&q=60' },
//   { name: 'Books',       img: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=800&q=60' },
//   { name: 'Sports',      img: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=800&q=60' },
//   { name: 'Footwear',     img: 'https://images.hindustantimes.com/rf/image_size_960x540/HT/p2/2018/05/13/Pictures/collection-of-female-shoes-on-wooden-floor_d426d1c6-566d-11e8-ae13-d985d3701f4e.jpg' },
//   { name: 'Accessories', img: 'https://hips.hearstapps.com/hmg-prod/images/set-of-fashion-collection-with-trendy-fashion-royalty-free-image-1730393789.jpg?crop=0.668xw:1.00xh;0.167xw,0&resize=1120:*' },
//   { name: 'Kitchen',     img: 'https://png.pngtree.com/thumb_back/fh260/background/20231030/pngtree-eco-conscious-kitchen-essentials-crafted-from-sustainable-materials-on-a-wooden-image_13774670.png' },
//   { name: 'Beauty',      img: 'https://media.istockphoto.com/id/1221677097/photo/make-up-cosmetics-products-against-pink-color-background.jpg?b=1&s=170667a&w=0&k=20&c=C3sbcRcACM5E7sxFkON61OR5qqFvm8gHs8vwsFN6Nuc=' },
//   { name: 'Toys',        img: 'https://static.vecteezy.com/system/resources/previews/028/535/150/non_2x/a-myriad-of-vibrant-toys-carefully-curated-and-proudly-displayed-generative-ai-photo.jpg' },
//   { name: 'Furniture',   img: 'https://assets.weimgs.com/weimgs/ab/images/wcm/products/202237/0042/andes-3-piece-ottoman-sectional-90-105-fwh.jpg' },
//   {
//     name: 'Kids Fashion',
//     img: 'https://businessideaai.com/wp-content/uploads/2023/07/20230709_110909.jpg'
//   },
// ];

categories = [
  { name: 'Electronics', img: 'https://i.postimg.cc/qRrFChbc/eclogo.jpg' },
  { name: 'Fashion',     img: 'https://i.postimg.cc/BQJqGtJK/cloth.jpg' },
  { name: 'Books',       img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvVg-vb5J-rRNutFR6HOMQ3tK75N6xjj1PRA&s' },
  { name: 'Footwear',     img: 'https://i.postimg.cc/qv06Sp5b/footwear.png' }
 
];

showWelcome = true;

  

  ngOnInit(): void {
    // show banner only when user is logged in and not dismissed before in this session
    if (!this.auth.isLoggedIn()) {
      this.showWelcome = false;
    } else if (sessionStorage.getItem('welcomeDismissed') === '1') {
      this.showWelcome = false;
    } else {
      this.showWelcome = true;
    }
  }

  // dismiss for this browser session
  dismissWelcome() {
    this.showWelcome = false;
    sessionStorage.setItem('welcomeDismissed', '1');
  }

  // friendly display name (title-cased)
  get displayName(): string {
    const u = this.auth.getUsername();
    if (!u) return 'Friend';
    const base = u.includes('@') ? u.split('@')[0] : u;
    return base.charAt(0).toUpperCase() + base.slice(1);
  }
}


