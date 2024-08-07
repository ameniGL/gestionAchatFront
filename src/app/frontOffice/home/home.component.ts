import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ApiService } from 'src/app/Api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  allProducts: any[] = [];
  filteredProducts: any[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 10;
  private subscription: Subscription | null = null;

  selectedCategory: string = '';
  selectedCategoryValue: string = '0';
  searchKeywords: string = '';
  minPrice: number = 0;
  maxPrice: number = Infinity;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.getAllProducts();
  }

  get pagedProducts() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    return this.filteredProducts.slice(start, end);
  }

  get totalPages() {
    return Math.ceil(this.filteredProducts.length / this.itemsPerPage);
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  getAllProducts(): void {
    this.subscription = this.apiService.product().subscribe(
      (res: any) => {
        this.allProducts = res;
        this.updateFilteredProducts(); // Apply initial filter
        console.log('Liste des produits:', this.allProducts);
      },
      (error: any) => {
        console.error('Erreur lors de la récupération des produits:', error);
      }
    );
  }

  updateFilteredProducts(): void {
    this.filteredProducts = this.filterProducts();
  }

  filterProducts(): any[] {
    return this.allProducts.filter(product => 
      (this.selectedCategory === '' || product.category === this.selectedCategory) &&
      (product.price >= this.minPrice && product.price <= this.maxPrice) &&
      (this.searchKeywords === '' || product.title.toLowerCase().includes(this.searchKeywords.toLowerCase()))
    );
  }

  applyFilters() {
    this.updateFilteredProducts();
    this.currentPage = 1; // Reset to the first page after filtering
  }

  getStars(rating: number): number[] {
    const totalStars = 5;
    const stars = [];
    const roundedRating = Math.round(rating * totalStars); // Adjust based on 0-1 scale

    for (let i = 0; i < totalStars; i++) {
      stars.push(i < roundedRating ? 1 : 0);
    }

    return stars;
  }

  get uniqueCategories() {
    return Array.from(new Set(this.allProducts.map(product => product.category)));
  }
  
  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}