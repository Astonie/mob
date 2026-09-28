<?php

namespace App\Enums;

enum BlockType: string
{
    case Hero = 'hero';
    case RichText = 'rich_text';
    case Image = 'image';
    case ImageText = 'image_text';
    case Gallery = 'gallery';
    case Video = 'video';
    case Stats = 'stats';
    case CardGrid = 'card_grid';
    case ProjectGrid = 'project_grid';
    case MineralGrid = 'mineral_grid';
    case NewsGrid = 'news_grid';
    case LeadershipGrid = 'leadership_grid';
    case Timeline = 'timeline';
    case Accordion = 'accordion';
    case Faq = 'faq';
    case Cta = 'cta';
    case DocumentList = 'document_list';
    case Map = 'map';
    case ContactForm = 'contact_form';

    public static function values(): array
    {
        return array_column(self::cases(), 'value');
    }
}
