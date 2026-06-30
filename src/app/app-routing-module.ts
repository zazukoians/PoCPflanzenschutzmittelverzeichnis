import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ObUnknownRouteModule} from '@oblique/oblique';

const routes: Routes = [
	{path: '', redirectTo: 'products', pathMatch: 'full'},
	{
		path: 'products',
		loadChildren: () => import('./features/products/routes').then(m => m.routes)
	}
	//	{path: '**', redirectTo: 'unknown-route'}
];

@NgModule({
	imports: [
		RouterModule.forRoot(routes, {
			anchorScrolling: 'enabled',
			bindToComponentInputs: true
		}),
		ObUnknownRouteModule
	],
	exports: [RouterModule]
})
export class AppRoutingModule {}
