<?php

namespace App\Http\Controllers;

use App\Models\Categoria;
use Illuminate\Http\Request;

class CategoriaController extends Controller
{
    function index(){
        $categorias = Categoria::all();

        return response()->json($categorias);
    }

    function getCategoriaById($id){
        $categoria = Categoria::find($id);

        return response()->json($categoria);
    }
}
