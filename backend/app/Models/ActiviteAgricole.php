<?php
// app/Models/ActiviteAgricole.php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ActiviteAgricole extends Model
{
    use HasFactory;

    // Spécifiez le nom de la table
    protected $table = 'activite_agricoles';

    protected $fillable = ['type', 'description', 'date', 'id_culture'];

    public function culture()
    {
        return $this->belongsTo(Culture::class, 'id_culture');
    }
}
