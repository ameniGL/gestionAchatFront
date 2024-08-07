import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ApiService } from 'src/app/Api.service';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})
export class BodyComponent implements OnInit, OnDestroy {
  allProducts: any[] = [];
  filteredProducts: any[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 10;
  private subscription: Subscription | null = null;

  selectedCategories: Set<string> = new Set<string>();
  selectedBrands: Set<string> = new Set<string>();
  searchKeywords: string = '';
  minPrice: number = 0;
  maxPrice: number = Infinity;
  selectedRatings: Set<number> = new Set<number>(); // Track selected ratings

  uniqueCategories: string[] = []; // List of unique categories
  uniquebrand: string[] = []; // List of unique brands

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

        // Extract unique categories and brands
        this.uniqueCategories = Array.from(new Set(this.allProducts.map(product => product.category)));
        this.uniquebrand = Array.from(new Set(this.allProducts.map(product => product.brand)));

        // Sort by global rating
        this.allProducts.sort((a: any, b: any) => b.globalrating - a.globalrating);

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
    this.sortProducts('low-to-high'); // Default sorting
  }

  filterProducts(): any[] {
    return this.allProducts.filter(product =>
      (this.selectedCategories.size === 0 || this.selectedCategories.has(product.category)) &&
      (this.selectedBrands.size === 0 || this.selectedBrands.has(product.brand)) &&
      (product.price >= this.minPrice && product.price <= this.maxPrice) &&
      (this.searchKeywords === '' || product.title.toLowerCase().includes(this.searchKeywords.toLowerCase())) &&
      (this.selectedRatings.size === 0 || this.selectedRatings.has(Math.floor(product.rating)))
    );
  }

  applyFilters() {
    this.updateFilteredProducts();
    this.currentPage = 1; // Reset to the first page after filtering
  }

  applyCategoryFilter(event: Event): void {
    const input = event.target as HTMLInputElement;
    const category = input.value;

    if (input.checked) {
      this.selectedCategories.add(category);
    } else {
      this.selectedCategories.delete(category);
    }

    this.applyFilters(); // Reapply filters when the category changes
  }

  applyBrandFilter(event: Event): void {
    const input = event.target as HTMLInputElement;
    const brand = input.value;

    if (input.checked) {
      this.selectedBrands.add(brand);
    } else {
      this.selectedBrands.delete(brand);
    }

    this.applyFilters(); // Reapply filters when the brand changes
  }

  sortProducts(sortOrder: string) {
    this.filteredProducts.sort((a, b) => {
      if (sortOrder === 'low-to-high') {
        return a.price - b.price;
      } else if (sortOrder === 'high-to-low') {
        return b.price - a.price;
      } else {
        return 0;
      }
    });
    this.currentPage = 1; // Reset to the first page after sorting
  }

  getStars(rating: number): number[] {
    const totalStars = 5;
    const stars = [];
    const roundedRating = Math.round(rating); // Adjust based on 1-5 scale

    for (let i = 0; i < totalStars; i++) {
      stars.push(i < roundedRating ? 1 : 0);
    }

    return stars;
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
